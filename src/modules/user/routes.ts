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
import { MessagesType } from "@/modules/user/typings";

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
        ...createMessage,
        component: createMessageView,
        path: "new",
        meta: { auth: true }
      },
      {
        ...message,
        component: messageView,
        path: "read/:message(\\d+)",
        meta: { auth: true },
        props: true
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

export function messagesRoute(p?: { type?: MessagesType } & PagingParams) {
  if (!p) p = {};
  p.type = p.type === "outbox" ? "outbox" : "inbox";
  return createRoute(messages, p);
}

export function messageRoute(p: { message: Id }) {
  return createRoute(message, p, {});
}

export function createMessageRoute() {
  return createRoute(createMessage, {}, {});
}
