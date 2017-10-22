<template>
  <div id="app-view">
    <navbar :left-menu="leftNav" :right-menu="rightNav">
      <router-link :to="home" class="navbar-brand">
        {{ $t('appTitle') }}
      </router-link>
    </navbar>

    <div class="container">
      <crip-loading color="rgba(88, 91, 169, 1)"/>

      <transition
          mode="out-in"
          name="fade-horizontal"
          enter-active-class="animated fadeInLeft"
          leave-active-class="animated fadeOutRight">
        <router-view class="row"/>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import {left as leftNav, right as rightNav} from './Components/Navigation'
import {home, Route} from '@/Router/Routes'
import Auth from '@/Helpers/Auth'

export default {
  name: 'app',

  async mounted() {
    this.$logger.component(this)
    await Auth.check()
  },

  computed: {
    home(): Route {
      return home
    },

    leftNav() {
      return leftNav()
    },

    rightNav() {
      return rightNav()
    },
  }
}
</script>

<style lang="scss">
/*@import "../../node_modules/animate.css/animate.css";
@import "../../node_modules/bootstrap-datepicker/dist/css/bootstrap-datepicker.css";
@import "../../node_modules/select2/dist/css/select2.css";
@import "../../node_modules/font-awesome/css/font-awesome.css";*/
@import "./sass/app";

.router-link-active {
  font-weight: bolder !important;
}
</style>
