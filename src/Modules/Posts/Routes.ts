import { Location, RouteConfig } from "vue-router"

import * as roles from "@/Components/Auth/Roles"
import {
  createPost,
  home as homeRoute,
  managePost,
  managePosts,
  readPost,
} from "@/Router/Routes"

const managePostVue = () =>
  import(/* webpackChunkName: "posts" */ "./ManagePost.vue")

const managePostsVue = () =>
  import(/* webpackChunkName: "posts" */ "./ManagePosts.vue")

const postListVue = () =>
  import(/* webpackChunkName: "posts" */ "./PostList.vue")

const postViewVue = () =>
  import(/* webpackChunkName: "posts" */ "./PostView.vue")

export const home = {
  ...(homeRoute as Location),
  component: postListVue,
  path: "/home/:page?",
} as RouteConfig

export const posts = [
  {
    ...(readPost as Location),
    component: postViewVue,
    path: "/posts/:id(\\d+)",
  } as RouteConfig,
  {
    ...(createPost as Location),
    component: managePostVue,
    meta: { requiresAuth: true, requiresRoles: [roles.CREATE_POST] },
    path: "/posts/manage/new",
  } as RouteConfig,
  {
    ...(managePosts as Location),
    component: managePostsVue,
    meta: {
      requiresAnyOfRoles: [roles.CREATE_POST, roles.MANAGE_POSTS],
      requiresAuth: true,
    },
    path: "/posts/manage/all/:page(\\d+)?/:sort?/:direction?/:perPage(\\d+)?",
  } as RouteConfig,
  {
    ...(managePost as Location),
    component: managePostVue,
    meta: {
      requiresAnyOfRoles: [roles.CREATE_POST, roles.MANAGE_POSTS],
      requiresAuth: true,
    },
    path: "/posts/manage/:id(\\d+)",
  } as RouteConfig,
]
