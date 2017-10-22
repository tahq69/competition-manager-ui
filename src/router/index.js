import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function load(component) {
  return () => import(`@/components/${component}.vue`)
}

export default new Router({
  routes: [
    { path: '/', name: 'hello', component: load('HelloWorld') },
    { path: '/login', name: 'login', component: load('Login') },
  ]
})
