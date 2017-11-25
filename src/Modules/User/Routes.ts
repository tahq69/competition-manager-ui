import Wrapper from "@/Components/Wrapper.vue"
import {
  forgotPassword,
  login,
  profile,
  resetPassword,
  signUp,
} from "@/Router/Routes"

const loginVue = () => import("./Login.vue")
const signUpVue = () => import("./SignUp.vue")
const profileVue = () => import("./Profile.vue")
const resetPasswordVue = () => import("./ResetPassword.vue")
const forgotPasswordVue = () => import("./ForgotPassword.vue")

export default {
  path: "/auth",
  component: Wrapper,
  children: [
    { path: "login", ...login, component: loginVue },
    { path: "profile/:id?", ...profile, component: profileVue },
    { path: "sign-up", ...signUp, component: signUpVue },
    { path: "password/email", ...forgotPassword, component: forgotPasswordVue },
    {
      path: "password/reset/:token",
      ...resetPassword,
      component: resetPasswordVue,
    },
  ],
}
