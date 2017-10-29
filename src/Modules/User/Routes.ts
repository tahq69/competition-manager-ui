import Wrapper from "@/Components/Wrapper.vue"
import {
  forgotPassword,
  login,
  profile,
  resetPassword,
  signUp,
} from "@/Router/Routes"

import ForgotPassword from "./ForgotPassword.vue"
import Login from "./Login.vue"
import Profile from "./Profile.vue"
import ResetPassword from "./ResetPassword.vue"
import SignUp from "./SignUp.vue"

export default {
  path: "/auth",
  component: Wrapper,
  children: [
    { path: "login", ...login, component: Login },
    { path: "profile/:id?", ...profile, component: Profile },
    { path: "sign-up", ...signUp, component: SignUp },
    { path: "password/email", ...forgotPassword, component: ForgotPassword },
    {
      path: "password/reset/:token",
      ...resetPassword,
      component: ResetPassword,
    },
  ],
}
