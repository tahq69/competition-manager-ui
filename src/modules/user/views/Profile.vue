<script lang="ts">
import Vue from "vue"

import { User } from "@/components/auth/user"
import { Next } from "@/types"

import { Profile } from "../models/profile"
import userService from "../service"

export default Vue.extend({
  name: "Profile",

  beforeRouteEnter(to, from, next: Next<any>) {
    userService.fetchUserProfile({ id: to.params.id }).then(user => next(vm => vm.setUser(user)))
  },

  data() {
    return {
      profile: {} as Profile,
    }
  },

  methods: {
    setUser(profile: Profile) {
      this.profile = profile
    },
  },
})
</script>

<template>
  <div>Profile.vue</div>
</template>
