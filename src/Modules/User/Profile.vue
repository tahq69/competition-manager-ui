<script lang="ts">
import Gravatar from "@/Components/Gravatar.vue"

import store from "@/Store"

import { IFetchProfile, IProfile } from "./Store/Contracts"

export default {
  name: "Profile",

  components: { Gravatar },

  async created() {
    this.profile = await store.dispatch<IFetchProfile>({
      type: "fetchProfile",
      userId: this.userId,
    })
  },

  data() {
    const profile: IProfile = null
    return {
      profile,
    }
  },

  computed: {
    userId() {
      return this.$route.params.id || store.state.auth.user.id
    },
  },
}
</script>

<template>
  <div>Profile.vue</div>
</template>
