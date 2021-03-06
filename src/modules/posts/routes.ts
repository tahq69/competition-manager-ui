import { Location, RouteConfig } from "vue-router";

import * as roles from "@/components/auth/roles";
import {
  createPost,
  home as homeRoute,
  managePost,
  managePosts,
  readPost
} from "@/router/routes";

import managePostVue from "./views/ManagePost.vue";
import managePostsVue from "./views/ManagePosts.vue";
import postListVue from "./views/PostList.vue";
import postViewVue from "./views/PostView.vue";

export const home: RouteConfig = {
  ...homeRoute,
  component: postListVue,
  path: "/home/:page(\\d+)?/:sort?/:direction?/:pageSize(\\d+)?",
  props: true
};

export const posts: RouteConfig[] = [
  {
    ...createPost,
    component: managePostVue,
    meta: { auth: true, roles: [roles.CREATE_POST] },
    path: "/post/manage/new",
    props: true
  },
  {
    ...managePost,
    component: managePostVue,
    meta: { auth: true, roles: [roles.MANAGE_POSTS] },
    path: "/post/manage/:post(\\d+)",
    props: true
  },
  {
    ...managePosts,
    component: managePostsVue,
    meta: { auth: true, roles: [roles.CREATE_POST, roles.MANAGE_POSTS] },
    path: "/posts/manage/:page(\\d+)?/:sort?/:direction?/:pageSize(\\d+)?"
  },
  {
    ...readPost,
    component: postViewVue,
    path: "/post/:post(\\d+)",
    props: true
  }
];
