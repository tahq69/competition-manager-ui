<script lang="ts">
import Vue from "vue"

import Auth from "@/Components/Auth"
import { home, IRoute } from "@/Router/Routes"

import NavGroup from "./Components/Nav/NavGroup"
import NavItem from "./Components/Nav/NavItem"
import { left as leftNav, right as rightNav } from "./Components/Navigation"

export default Vue.extend({
  name: "app",

  async mounted() {
    this.$logger.component(this)
    await Auth.check()
  },

  computed: {
    home(): IRoute {
      return home
    },

    leftNav(): (NavGroup | NavItem)[] {
      return leftNav()
    },

    rightNav(): (NavGroup | NavItem)[] {
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
    <navbar :left-menu="leftNav"
            :right-menu="rightNav">
      <router-link :to="home"
                   class="navbar-brand">
        {{ $t('app.title') }}
      </router-link>
    </navbar>

    <div class="container">
      <transition mode="out-in"
                  name="fade-horizontal"
                  enter-active-class="animated fadeInLeft"
                  leave-active-class="animated fadeOutRight">
        <router-view class="row" />
      </transition>
    </div>
  </div>
</template>

<style lang="scss">
@import "./../node_modules/animate.css/animate.css";
@import "./../node_modules/bootstrap-datepicker/dist/css/bootstrap-datepicker.css";
@import "./../node_modules/font-awesome/css/font-awesome.css";
@import "./sass/app";

.router-link-active {
  font-weight: bolder !important;
}
</style>
