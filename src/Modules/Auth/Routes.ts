import Wrapper from '@/Components/Wrapper.vue'
import { login, signUp, forgotPassword, passwordReset } from '@/Router/Routes'
/*import Login from './Login.vue'
import SignUp from './SignUp.vue'
import PasswordForgot from './PasswordForgot.vue'
import PasswordReset from './PasswordReset.vue'*/

export default {
  path: '/auth',
  component: Wrapper,
  children: [
    /*{path: 'login', ...routes.login, component: Login},
    {path: 'sign-up', ...routes.signUp, component: SignUp},
    {path: 'forgot-password', ...routes.forgotPassword, component: PasswordForgot},
    {path: 'forgot-password', ...routes.passwordReset, component: PasswordReset},*/
  ]
}
