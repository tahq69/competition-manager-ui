// https://github.com/vuejs/vue
import Vue from "vue"

// https://www.npmjs.com/package/crip-vue-loading
import CripLoading, { ILoadingOptions } from "crip-vue-loading"

// https://www.npmjs.com/package/crip-vue-notice
import CripNotice, { INoticesOptions } from "crip-vue-notice"

// https://www.npmjs.com/package/crip-vue-select
import CripSelect, { CripSelectOptions } from "crip-vue-select"

// https://www.npmjs.com/package/crip-vue-bootstrap
import CripBootstrap, { IBootstrapOptions } from "crip-vue-bootstrap"

// https://github.com/axios/axios
import axios from "axios"

import { sync } from "vuex-router-sync"

import App from "./App.vue"
import config from "./Config"
import Logger from "./Helpers/Logger"
import Lang, { i18n } from "./Lang"
import Router from "./Router"
import Guard from "./Router/Guard"
import Store from "./Store"

Vue.use<CripSelectOptions>(CripSelect)
Vue.use<IBootstrapOptions>(CripBootstrap, { prefix: "C" })
Vue.use<INoticesOptions>(CripNotice, { duration: 4, styles: { top: "64px", right: "15px" } })
Vue.use<ILoadingOptions>(CripLoading, { axios, color: "rgba(88,91,169,1)" })
Vue.use(Logger, config.logs)

sync(Store, Router)
Guard(Router)

Vue.config.productionTip = false

const app = new Vue({
  i18n,
  render: h => h(App),
  router: Router,
  store: Store,
})

// console.log("Vue.options.components", (Vue as any).options.components)

// Initialize user locale after app mount is completed.
Lang()

app.$mount(document.getElementById("app") || undefined)
