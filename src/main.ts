// https://github.com/vuejs/vue
import Vue from 'vue'

// https://github.com/shakee93/vue-toasted
import Toasted from 'vue-toasted'

// https://www.npmjs.com/package/crip-vue-bootstrap-modal
import CripModal from 'crip-vue-bootstrap-modal'

// https://www.npmjs.com/package/crip-vue-loading
import CripLoading from 'crip-vue-loading'

// https://github.com/axios/axios
import axios from 'axios'

import { sync } from 'vuex-router-sync'

import App from './App.vue'
import Router from './Router'
import Guard from './Router/Guard'
import Store from './Store'
import Logger from './Helpers/Logger'
import { logger } from './Config'
import Lang, { i18n } from './Lang'

Vue.use(CripLoading, { axios })
Vue.use(CripModal)
Vue.use(Logger, logger)

sync(Store, Router)
Guard(Router)

Vue.config.productionTip = false

let app = new Vue({
  render: (h) => h(App),
  router: Router,
  store: Store,
  i18n,
})

// Initialize user locale after app mount is completed.
Lang()

app.$mount(document.getElementById('app'))
