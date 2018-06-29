// https://github.com/vuejs/vue
import Vue from "vue";
import { sync } from "vuex-router-sync";
import ElementUI from "element-ui";

import "element-ui/lib/theme-chalk/index.css";

import "./helpers/logger";
import { config } from "./config";
Object.defineProperty(Vue.prototype, "_config", { get: () => config });

import App from "./App.vue";
import Lang, { i18n } from "./lang";
import Router from "./router";
import Guard from "./router/guard";
import { store } from "./store";

import "./helpers/filters";

sync(store, Router);
Guard(Router);
Vue.use(ElementUI);

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
