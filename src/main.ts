import Vue from "vue";
import { sync } from "vuex-router-sync";
import ElementUI from "element-ui";
import "babel-polyfill";

import "./helpers/logger";
import "./helpers/filters";
import "./config";

import App from "./App.vue";
import Lang, { i18n } from "./lang";
import Router from "./router";
import Guard from "./router/guard";
import { store } from "./store";

sync(store, Router);
Guard(Router);
Vue.use(ElementUI, { i18n: (key: any, value: any) => i18n.t(key, value) });

Vue.config.productionTip = false;

const app = new Vue({
  i18n,
  render: h => h(App),
  router: Router,
  store
});

// console.log("Vue.options.components", (Vue as any).options.components)

// Initialize user locale after app instance is created.
Lang();

app.$mount(document.getElementById("app") || undefined);
