import OAuth from '../oauth'

export default {
  install(Vue, options) {
    Vue.prototype.$oauth = new OAuth();

    Vue.mixin({
      mounted() {
        console.log("Bootstrapping")
      }
    })
  }
}
