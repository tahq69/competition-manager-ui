<script lang="ts">
import Gravatar from "@/Components/Gravatar.vue"

import store from "@/Store"

import { IFetchProfile, IProfile } from "./Store/Contracts"

import Vue from "vue"

export default Vue.extend({
  name: "Profile",

  components: { Gravatar },

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
