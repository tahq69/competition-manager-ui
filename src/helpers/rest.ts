import Vue from "vue";
import axios, { AxiosResponse } from "axios";

import router from "@/router";
import { login } from "@/router/routes";
import config from "@/config";
import { t } from "@/lang";
import events from "@/helpers/events";

import { IUrlParams, ContextAction } from "./typings";
import Utils from "./utils";

export const http = axios;

export function url(path: string, props: IUrlParams = {}) {
  let url = path.replace(new RegExp("^[\\/]+"), "");
  url = props.root ? `${config.url}/${url}` : `${config.api_url}/${url}`;
  url = Utils.supplant(url, props.urlReplace || {});

  Object.keys(props.params || {}).forEach(index => {
    const val = (props.params || {})[index];
    if (Utils.hasValue(val)) {
      url = addParameter(url, index, val);
    }
  });

  return url;
}

export function addParameter(url: string, param: string, value: string) {
  // Using a positive look ahead (?=\=) to find the
  // given parameter, preceded by a ? or &, and followed
  // by a = with a value after than (using a non-greedy selector)
  // and then followed by a & or the end of the string
  const val = new RegExp(`(\\?|\\&)${param}=.*?(?=(&|$))`);
  const parts = url.toString().split("#");
  const hash = parts[1];
  const queryString = /\?.+$/;
  let newURL = (url = parts[0]);

  // Check if the parameter exists
  if (val.test(url)) {
    // if it does, replace it, using the captured group
    // to determine & or ? at the beginning
    newURL = url.replace(val, `$1${param}=${value}`);
  } else if (queryString.test(url)) {
    // otherwise, if there is a query string at all
    // add the param to the end of it
    newURL = `${url}&${param}=${value}`;
  } else {
    // if there's no query string, add one
    newURL = `${url}?${param}=${value}`;
  }

  if (hash) {
    // if hash exists, append it to new url
    newURL += `#${hash}`;
  }

  return newURL;
}

export async function httpContext<T>(
  action: ContextAction<Promise<T>>
): Promise<T> {
  try {
    return await action(http);
  } catch (error) {
    throw handleError(error);
  }
}

export function handleError(error: any): string {
  if (error && error.response) {
    return handleHttpError(error.response);
  }

  Vue.logger.error("Api.handle -> unknown", error);

  Vue.notice.error({ title: t("app.api_unexpectedError") });

  return t("app.api_unexpectedError");
}

export function handleHttpError(response: AxiosResponse): string {
  if (response.status !== 422) {
    return handleUnexpectedHttpError(response);
  }

  Vue.logger.log("Api.error -> validation", response.data);

  // Simply throw validation response errors.
  if (response.data.hasOwnProperty("errors")) {
    return response.data.errors;
  }

  return response.data;
}

export function handleUnexpectedHttpError(response: AxiosResponse): string {
  switch (response.status) {
    case 401:
      Vue.logger.error("Api.http -> unauthorized", response.data);
      Vue.notice.warning({ title: t("app.unauthorized") });

      // fire event for auth module to unauthorize user from the system.
      events.$emit("auth:logout");
      //Auth.logout();

      // Redirect user to login page, but with query to current path. This
      // will allow redirect user to expected route after authorization will
      // be completed.
      router.push({
        ...login,
        query: { redirect: router.currentRoute.fullPath }
      });

      return t("app.unauthorized");
    case 404:
      Vue.notice.error({ title: t("app.api_actionNotFound") });
      return t("app.api_actionNotFound");
    case 403:
    case 405:
      Vue.notice.warning({ title: t("app.api_actionNotAllowed") });
      Vue.logger.log("Api.http -> not allowed", response);
      // TODO: send this as email to admin to be able detect users who is
      // trying hack app or some places has not enough protection and simple
      // user can open it and create not allowed requests.
      return t("app.api_actionNotAllowed");
    default:
      Vue.logger.log("Api.http -> unknown", response);
      Vue.notice.warning({ title: t("app.api_unknownHttpError") });
      // TODO: send this as email to admin to be able detect unexpected http
      // errors.
      return t("app.api_unknownHttpError");
  }
}
