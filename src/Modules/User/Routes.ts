import Wrapper from "@/Components/Wrapper.vue"
import {
  forgotPassword,
  login,
  profile,
  resetPassword,
  signUp,
} from "@/Router/Routes"

import Login from "./Login.vue"
import SignUp from "./SignUp.vue"

const resetPasswordVue = () =>
  import(/* webpackChunkName: "user" */ "./ResetPassword.vue")

const forgotPasswordVue = () =>
  import(/* webpackChunkName: "user" */ "./ForgotPassword.vue")

const profileVue = () => import(/* webpackChunkName: "user" */ "./Profile.vue")

export default {
  path: "/auth",
  component: Wrapper,
  children: [
    { path: "login", ...login, component: Login },
    { path: "profile/:id?", ...profile, component: profileVue },
    { path: "sign-up", ...signUp, component: SignUp },
    { path: "password/email", ...forgotPassword, component: forgotPasswordVue },
    {
      path: "password/reset/:token",
      ...resetPassword,
      component: resetPasswordVue,
    },
  ],
}
