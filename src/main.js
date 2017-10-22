import Vue from 'vue'
import App from './App'
import router from './router'
import Bootstrap from './bootstrap'

Vue.use(Bootstrap)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
