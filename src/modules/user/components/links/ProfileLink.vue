<script lang="ts">
import Vue from "vue";
import { Location } from "vue-router";

import { link } from "@/components/mixins";
import { userProfileRoute } from "#/user/routes";

export default Vue.extend({
  name: "ProfileLink",

  mixins: [link],

  props: {
    user: { type: [String, Number], required: true }
  },

  computed: {
    to(): Location {
      return userProfileRoute({ user: this.user });
    }
  }
});
</script>

<template>
  <router-link :to="to"
               :tag="tag"
               :exact="exact"
               :class="elClass">
    <i v-if="icon"
       :class="_icon"></i>
    <slot>
      <!-- default slot -->
    </slot>
  </router-link>
</template>
