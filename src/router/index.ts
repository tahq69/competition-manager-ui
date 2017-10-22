import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
import Login from '../components/Login.vue'
Vue.use(Router)

/*function load(component) {
  return () => import(`@/components/${component}.vue`)
}*/

export default new Router({
  routes: [
    { path: '/', name: 'hello', component: HelloWorld },
    { path: '/login', name: 'login', component: Login },
  ]
})
