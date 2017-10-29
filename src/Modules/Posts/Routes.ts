import * as roles from "@/Components/Auth/Roles"
import Wrapper from "@/Components/Wrapper.vue"
import {
  createPost,
  editPost,
  home as homeRoute,
  listPosts,
  readPost,
} from "@/Router/Routes"

import CreateEditPost from "./ManagePost.vue"
import ListPosts from "./ManagePosts.vue"
import PostList from "./PostList.vue"
import Home from "./PostList.vue"
import ReadPost from "./PostView.vue"

export const home = { path: "/home/:page?", component: PostList, ...homeRoute }
export const posts = {
  path: "/posts",
  component: Wrapper,
  children: [
    { path: ":id(\\d+)", component: ReadPost, ...readPost },
    {
      path: "manage/new",
      component: CreateEditPost,
      meta: { requiresAuth: true, requiresRoles: [roles.CREATE_POST] },
      ...createPost,
    },
    {
      path: "manage/all/:page(\\d+)?/:sort?/:order?",
      component: ListPosts,
      meta: {
        requiresAuth: true,
        requiresAnyOfRoles: [roles.CREATE_POST, roles.MANAGE_POSTS],
      },
      ...listPosts,
    },
    {
      path: "manage/:id(\\d+)",
      component: CreateEditPost,
      meta: {
        requiresAuth: true,
        requiresAnyOfRoles: [roles.CREATE_POST, roles.MANAGE_POSTS],
      },
      ...editPost,
    },
  ],
}
