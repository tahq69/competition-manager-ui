import {
  forgotPassword,
  Location,
  login,
  profile,
  resetPassword,
  RouteConfig,
  signUp,
} from "@/Router/Routes"

import Login from "./Login.vue"
import SignUp from "./SignUp.vue"

const resetPasswordVue = () =>
  import(/* webpackChunkName: "user" */ "./ResetPassword.vue")

const forgotPasswordVue = () =>
  import(/* webpackChunkName: "user" */ "./ForgotPassword.vue")

const profileVue = () => import(/* webpackChunkName: "user" */ "./Profile.vue")

export default [
  {
    ...(login as Location),
    component: Login,
    path: "/login",
  } as RouteConfig,
  {
    ...(profile as Location),
    component: profileVue,
    path: "/profile/:id?",
  } as RouteConfig,
  {
    ...(signUp as Location),
    component: SignUp,
    path: "/sign-up",
  } as RouteConfig,
  {
    ...(forgotPassword as Location),
    component: forgotPasswordVue,
    path: "/auth/password/email",
  } as RouteConfig,
  {
    ...(resetPassword as Location),
    component: resetPasswordVue,
    path: "/auth/password/reset/:token",
  } as RouteConfig,
]
