<script lang="ts">
import Vue from "vue"

import { User } from "@/components/auth/user"
import { Next } from "@/types"

import { IFetchProfile, IProfile } from "../store/types"

import userService from "../service"

export default Vue.extend({
  name: "Profile",

  beforeRouteEnter(to, from, next: Next<any>) {
    userService.fetchUser({ id: to.params.id }).then(user => next(vm => vm.setUser(user)))
  },

  data() {
    return {
      user: {} as User,
    }
  },

  methods: {
    setUser(user: User) {
      this.user = user
    },
  },
})
</script>

<template>
  <div>Profile.vue</div>
</template>
