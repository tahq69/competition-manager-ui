import { RouteConfig } from "vue-router";
import "@/modules/user/components/links";

import {
  authProfile,
  forgotPassword,
  login,
  profile,
  resetPassword,
  signUp,
  createRoute,
  messages,
  message,
  createMessage
} from "@/router/routes";
import { Id, PagingParams } from "@/typings";

import loginView from "@/modules/user/views/Login.vue";
import signUpView from "@/modules/user/views/SignUp.vue";
import resetPasswordVue from "@/modules/user/views/ResetPassword.vue";
import forgotPasswordVue from "@/modules/user/views/ForgotPassword.vue";
import profileVue from "@/modules/user/views/Profile.vue";

import messagesView from "@/modules/user/views/Messages.vue";
import messageView from "@/modules/user/views/Message.vue";
import createMessageView from "@/modules/user/views/CreateMessage.vue";

export default [
  {
    ...login,
    component: loginView,
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
    ...messages,
    component: messagesView,
    path: "/messages/:type/:page(\\d+)/:sort/:direction/:pageSize(\\d+)",
    meta: { auth: true },
    props: true,
    children: [
      {
        ...message,
        component: messageView,
        path: "/message/:message(\\d+)",
        meta: { auth: true },
        props: true
      },
      {
        ...createMessage,
        component: createMessageView,
        path: "/message/new",
        meta: { auth: true }
      }
    ]
  },
  {
    ...signUp,
    component: signUpView,
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

export const userProfileRoute = (p: { user: Id }) =>
  createRoute(profile, p, {});

export function messagesRoute(p: { type?: string } & PagingParams) {
  const direction = "descending";
  const pageSize = 20;
  const params = { page: 1, pageSize, sort: "id", direction, type: "inbox" };

  return createRoute(messages, p, params);
}

export function messageRoute(p: { message: Id }) {
  return createRoute(message, p, {});
}

export function newMessageRoute() {
  return createRoute(message, {}, {});
}
