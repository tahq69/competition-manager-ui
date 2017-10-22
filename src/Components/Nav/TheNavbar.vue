<template>
  <nav class="navbar navbar-default navbar-static-top">
    <div class="container">
      <div class="navbar-header">

        <!-- Collapsed Hamburger -->
        <button
            type="button"
            class="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#app-navbar-collapse">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>

        <!-- Branding Image -->
        <slot/>
      </div>

      <div id="app-navbar-collapse" class="collapse navbar-collapse">
        <!-- Left Side Of Navbar -->
        <navbar-items
            v-if="hasLeftMenu"
            :items="leftMenu"
            class="nav navbar-nav"
        />

        <!-- Right Side Of Navbar -->
        <navbar-items
            v-if="hasRightMenu"
            :items="rightMenu"
            class="nav navbar-nav navbar-right"
        />
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import {NavGroup} from './index'

export default {
  name: 'theNavbar',

  props: {
    leftMenu: {'type': Array, 'default': () => []},
    rightMenu: {'type': Array, 'default': () => []},
  },


  computed: {
    hasLeftMenu() {
      return this.leftMenu.length > 0
    },

    hasRightMenu() {
      return this.rightMenu.length > 0
    },
  },
}
</script>