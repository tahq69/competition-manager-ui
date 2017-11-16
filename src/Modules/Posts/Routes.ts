import * as roles from "@/Components/Auth/Roles"
import Wrapper from "@/Components/Wrapper.vue"
import {
  createPost,
  managePost,
  home as homeRoute,
  managePosts,
  readPost,
} from "@/Router/Routes"

const ManagePost = () => import("./ManagePost.vue")
const ManagePosts = () => import("./ManagePosts.vue")
const PostList = () => import("./PostList.vue")
const PostView = () => import("./PostView.vue")

export const home = { path: "/home/:page?", component: PostList, ...homeRoute }
export const posts = {
  path: "/posts",
  component: Wrapper,
  children: [
    { path: ":id(\\d+)", component: PostView, ...readPost },
    {
      path: "manage/new",
      component: ManagePost,
      meta: { requiresAuth: true, requiresRoles: [roles.CREATE_POST] },
      ...createPost,
    },
    {
      path: "manage/all/:page(\\d+)?/:sort?/:order?",
      component: ManagePosts,
      meta: {
        requiresAuth: true,
        requiresAnyOfRoles: [roles.CREATE_POST, roles.MANAGE_POSTS],
      },
      ...managePosts,
    },
    {
      path: "manage/:id(\\d+)",
      component: ManagePost,
      meta: {
        requiresAuth: true,
        requiresAnyOfRoles: [roles.CREATE_POST, roles.MANAGE_POSTS],
      },
      ...managePost,
    },
  ],
}
