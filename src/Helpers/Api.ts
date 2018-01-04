import { AxiosResponse } from "axios"
import Vue from "vue"
import { Location } from "vue-router"

import Auth from "@/Components/Auth"
import config from "@/Config"
import { t, Utils } from "@/Helpers"
import router from "@/Router"
import { login } from "@/Router/Routes"
import store from "@/Store"
import { IDictionary } from "@/types"

interface IUrlParams {
  params?: IDictionary<string>
  urlReplace?: object
  root?: boolean
}

export class Api {
  public static url(path: string, props: IUrlParams = {}) {
    let url = path.replace(new RegExp("^[\\/]+"), "")
    url = props.root ? `${config.url}/${url}` : `${config.api_url}/${url}`
    url = Utils.supplant(url, props.urlReplace || {})

    Object.keys(props.params || {}).forEach(index => {
      const val = (props.params || {})[index]
      if (Utils.hasValue(val)) {
        url = Api.addParameter(url, index, val)
      }
    })

    return url
  }

  /**
   * Handle application error.
   * @param error
   */
  public static handle(error: any): Error {
    if (error && error.response) {
      return Api.handleHttpError(error.response)
    }

    Vue.logger.error("Api.handle -> unknown", error)

    Vue.notice.error({ title: t("app.api_unexpectedError") })

    return new Error(t("app.api_unexpectedError"))
  }

  /**
   * Add GET parameter to url string.
   * @param {string} url
   * @param {string} param
   * @param {string} value
   * @returns {string}
   */
  private static addParameter(url: string, param: string, value: string) {
    // Using a positive look ahead (?=\=) to find the
    // given parameter, preceded by a ? or &, and followed
    // by a = with a value after than (using a non-greedy selector)
    // and then followed by a & or the end of the string
    const val = new RegExp(`(\\?|\\&)${param}=.*?(?=(&|$))`)
    const parts = url.toString().split("#")
    const hash = parts[1]
    const queryString = /\?.+$/
    let newURL = (url = parts[0])

    // Check if the parameter exists
    if (val.test(url)) {
      // if it does, replace it, using the captured group
      // to determine & or ? at the beginning
      newURL = url.replace(val, `$1${param}=${value}`)
    } else if (queryString.test(url)) {
      // otherwise, if there is a query string at all
      // add the param to the end of it
      newURL = `${url}&${param}=${value}`
    } else {
      // if there's no query string, add one
      newURL = `${url}?${param}=${value}`
    }

    if (hash) {
      // if hash exists, append it to new url
      newURL += `#${hash}`
    }

    return newURL
  }

  /**
   * Handle http error and throw details.
   * @param {AxiosResponse} response
   */
  private static handleHttpError(response: AxiosResponse): Error {
    if (response.status !== 422) {
      return Api.handleUnexpectedHttpError(response)
    }

    Vue.logger.log("Api.error -> validation", response.data)

    // Simply throw validation response errors.
    if (response.data.hasOwnProperty("errors")) {
      return response.data.errors
    }

    return response.data
  }

  /**
   * Handle unexpected http error and handle its details.
   * @param {AxiosResponse} response
   * @returns {Error}
   */
  private static handleUnexpectedHttpError(response: AxiosResponse): Error {
    switch (response.status) {
      case 401:
        Vue.logger.error("Api.http -> unauthorized", response.data)
        Vue.notice.warning({ title: t("app.unauthorized") })
        Auth.logout()

        // Redirect user to login page, but with query to current path. This
        // will allow redirect user to expected route after authorization will
        // be completed.
        router.push({
          ...(login as Location),
          query: { redirect: router.currentRoute.fullPath },
        })

        return new Error(t("app.unauthorized"))
      case 403:
      case 405:
        Vue.logger.log("Api.http -> not allowed", response)
        // TODO: send this as email to admin to be able detect users who is
        // trying hack app or some places has not enough protection and simple
        // user can open it and create not allowed requests.
        return new Error(t("app.api_actionNotAllowed"))
      default:
        Vue.logger.log("Api.http -> unknown", response)
        // TODO: send this as email to admin to be able detect unexpected http
        // errors.
        return new Error(t("app.api_unknownHttpError"))
    }
  }
}
