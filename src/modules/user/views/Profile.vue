<script lang="ts">
import Vue from "vue"

import { Next } from "@/types"

import { Profile } from "../models/profile"
import userService from "../service"

export default Vue.extend({
  name: "Profile",

  props: {
    user: { type: String, required: false },
  },

  beforeRouteEnter(to, from, next: Next<any>) {
    userService
      .fetchUserProfile({ id: to.params.user })
      .then(profile => next(vm => vm.setProfile(profile)))
  },

  data: () => ({ profile: new Profile({}) }),

  methods: {
    setProfile(profile: Profile) {
      this.profile = profile
    },
  },
})
</script>

<template>
  <div>Profile.vue</div>
</template>
