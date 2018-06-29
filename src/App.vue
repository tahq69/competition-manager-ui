<script lang="ts">
import Vue from "vue";

import Auth from "@/components/auth";

import Navigation from "./components/Navigation.vue";

export default Vue.extend({
  name: "app",

  components: { Navigation },

  methods: {
    redirectAuthenticated() {
      // If user has redirected here by guard, redirect him back
      // to guarded route instead of home page.
      if (this.$route.query && this.$route.query["redirect"]) {
        this.$router.push(this.$route.query["redirect"]);
      }
    }
  },

  mounted() {
    Auth.check();
  },

  watch: {
    ["$store.state.auth.user.authenticated"](value: boolean) {
      // Watching user details, because they arrives later than route
      // guard redirects to login and in case we receive them, we can
      // redirect him to requested route.
      if (value) {
        this.redirectAuthenticated();
      }
    }
  }
});
</script>

<template>
  <el-container>
    <el-header>
      <Navigation />
    </el-header>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<style lang="scss">
@import "assets/styles";
</style>
