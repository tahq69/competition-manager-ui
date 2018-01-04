<script lang="ts">
import { NavElement } from "crip-vue-bootstrap"
import Vue from "vue"
import { Location } from "vue-router"

import Auth from "@/Components/Auth"
import { home } from "@/Router/Routes"

import { leftNav, rightNav } from "./Components/Navigation"

export default Vue.extend({
  name: "app",

  async mounted() {
    this.$logger.component(this)
    await Auth.check()
  },

  computed: {
    home(): Location {
      return home as Location
    },

    leftNav(): NavElement[] {
      return leftNav()
    },

    rightNav(): NavElement[] {
      return rightNav()
    },
  },

  methods: {
    redirectAuthenticated() {
      // If user has redirected here by guard, redirect him back
      // to guarded route instead of home page.
      if (this.$route.query && this.$route.query["redirect"]) {
        this.$router.push(this.$route.query["redirect"])
        return
      }

      this.$router.push(home)
    },
  },

  watch: {
    ["$store.state.auth.user.authenticated"](value: boolean) {
      // Watching user details, because they arrives later than route
      // guard redirects to login and in case we receive them, we can
      // redirect him to requested route.
      if (value) {
        this.redirectAuthenticated()
      }
    },
  },
})
</script>

<template>
  <div id="app-view">
    <CNavbar :left="leftNav"
             :right="rightNav"
             :containered="true"
             class="navbar-default navbar-static-top">
      <router-link :to="home"
                   class="navbar-brand">
        {{ $t('app.title') }}
      </router-link>
    </CNavbar>

    <div class="container">
      <div class="row">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "./sass/app";

.router-link-active {
  font-weight: bolder !important;
}
</style>
