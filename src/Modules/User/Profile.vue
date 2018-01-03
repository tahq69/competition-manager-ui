<script lang="ts">
import Vue from "vue"

import store from "@/Store"

import { IFetchProfile, IProfile } from "./Store/Contracts"

export default Vue.extend({
  name: "Profile",

  async created() {
    this.profile = await store.dispatch<IFetchProfile>({
      type: "fetchProfile",
      userId: this.userId,
    })
  },

  data() {
    const profile: IProfile | null = null
    return {
      profile,
    }
  },

  computed: {
    userId(): number {
      return parseInt((this.$route.params.id || store.state.auth.user.id).toString(), 10)
    },
  },
})
</script>

<template>
  <div>Profile.vue</div>
</template>
