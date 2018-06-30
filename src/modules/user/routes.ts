import { Location, RouteConfig } from "vue-router";

import {
  authProfile,
  convertParams,
  forgotPassword,
  login,
  profile,
  resetPassword,
  signUp,
  teamMembers
} from "@/router/routes";
import { Id } from "@/typings";

import Login from "./views/Login.vue";
import SignUp from "./views/SignUp.vue";

import resetPasswordVue from "./views/ResetPassword.vue";
import forgotPasswordVue from "./views/ForgotPassword.vue";
import profileVue from "./views/Profile.vue";

export default [
  {
    ...login,
    component: Login,
    path: "/login"
  },
  {
    ...authProfile,
    component: profileVue,
    path: "/profile",
    meta: { auth: true }
  },
  {
    ...profile,
    component: profileVue,
    path: "/profile/:user(\\d+)"
  },
  {
    ...signUp,
    component: SignUp,
    path: "/sign-up"
  },
  {
    ...forgotPassword,
    component: forgotPasswordVue,
    path: "/auth/password/email"
  },
  {
    ...resetPassword,
    component: resetPasswordVue,
    props: true,
    path: "/auth/password/reset/:token"
  }
] as RouteConfig[];

export const userProfileRoute = (p: { user: Id }) => ({
  ...profile,
  params: convertParams(p)
});

export const teamRoute = (p: { team: Id }) => {
  return { ...teamMembers, params: convertParams(p) };
};
