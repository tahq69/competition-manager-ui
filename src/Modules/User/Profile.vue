<script lang="ts">
import Vue from "vue"

import { User } from "@/Components/Auth/User"
import { Next } from "@/types"

import { IFetchProfile, IProfile } from "./Store/types"

import userService from "./Service"

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
