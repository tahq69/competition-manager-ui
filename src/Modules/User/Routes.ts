import Wrapper from "@/Components/Wrapper.vue"
import {
  forgotPassword,
  login,
  profile,
  resetPassword,
  signUp,
} from "@/Router/Routes"

const Login = () => import("./Login.vue")
const SignUp = () => import("./SignUp.vue")
const Profile = () => import("./Profile.vue")
const ResetPassword = () => import("./ResetPassword.vue")
const ForgotPassword = () => import("./ForgotPassword.vue")

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
