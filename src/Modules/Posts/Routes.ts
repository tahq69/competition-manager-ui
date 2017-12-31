import * as roles from "@/Components/Auth/Roles"
import Wrapper from "@/Components/Wrapper.vue"
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
  path: "/home/:page?",
  component: postListVue,
  ...homeRoute,
}
export const posts = {
  path: "/posts",
  component: Wrapper,
  children: [
    { path: ":id(\\d+)", component: postViewVue, ...readPost },
    {
      path: "manage/new",
      component: managePostVue,
      meta: { requiresAuth: true, requiresRoles: [roles.CREATE_POST] },
      ...createPost,
    },
    {
      path: "manage/all/:page(\\d+)?/:sort?/:order?",
      component: managePostsVue,
      meta: {
        requiresAuth: true,
        requiresAnyOfRoles: [roles.CREATE_POST, roles.MANAGE_POSTS],
      },
      ...managePosts,
    },
    {
      path: "manage/:id(\\d+)",
      component: managePostVue,
      meta: {
        requiresAuth: true,
        requiresAnyOfRoles: [roles.CREATE_POST, roles.MANAGE_POSTS],
      },
      ...managePost,
    },
  ],
}
