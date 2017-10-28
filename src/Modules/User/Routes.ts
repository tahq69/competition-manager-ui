import Wrapper from "@/Components/Wrapper.vue"
import {
  forgotPassword,
  login,
  passwordReset,
  profile,
  signUp,
} from "@/Router/Routes"

import Login from "./Login.vue"
import Profile from "./Profile.vue"
import SignUp from "./SignUp.vue"
/*import PasswordForgot from './PasswordForgot.vue'
import PasswordReset from './PasswordReset.vue'*/

export default {
  path: "/auth",
  component: Wrapper,
  children: [
    { path: "login", ...login, component: Login },
    { path: "profile/:id?", ...profile, component: Profile },
    { path: "sign-up", ...signUp, component: SignUp },
    /*{path: 'forgot-password', ...forgotPassword, component: PasswordForgot},
    {path: 'forgot-password', ...passwordReset, component: PasswordReset},*/
  ],
}
