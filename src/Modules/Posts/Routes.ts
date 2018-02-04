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

export const home: RouteConfig = {
  ...homeRoute,
  component: postListVue,
  path: "/home/:page(\\d+)?",
  props: true,
}

export const posts: RouteConfig[] = [
  {
    ...readPost,
    component: postViewVue,
    path: "/posts/:post(\\d+)",
    props: true,
  },
  {
    ...createPost,
    component: managePostVue,
    meta: { auth: true, roles: [roles.CREATE_POST] },
    path: "/post/new",
    props: true,
  },
  {
    ...managePosts,
    component: managePostsVue,
    meta: { auth: true, roles: [roles.CREATE_POST, roles.MANAGE_POSTS] },
    path: "/posts/manage/:page(\\d+)?/:sort?/:direction?/:perPage(\\d+)?",
  },
  {
    ...managePost,
    component: managePostVue,
    meta: { auth: true, roles: [roles.MANAGE_POSTS] },
    path: "/post/edit/:post(\\d+)",
    props: true,
  },
]
