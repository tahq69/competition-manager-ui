<script lang="ts">
import Vue from "vue";

import Auth from "@/components/auth";
import { LocalStorage } from "@/helpers/local-storage";

import TopNavigation from "@/components/TopNavigation.vue";
import AsideNavigation from "@/components/AsideNavigation.vue";

export default Vue.extend({
  name: "app",

  components: { TopNavigation, AsideNavigation },

  data: () => {
    let isCollapse = true;
    if (LocalStorage.get("is_navigation_collapsed") === "false")
      isCollapse = false;

    return { isCollapse };
  },

  computed: {
    mainStyles(): any {
      return { "margin-left": this.isCollapse ? "-135px" : "0px" };
    }
  },

  methods: {
    collapse() {
      this.isCollapse = !this.isCollapse;
      LocalStorage.set("is_navigation_collapsed", this.isCollapse.toString());
    },

    redirectAuthenticated() {
      // If user has redirected here by guard, redirect him back
      // to guarded route instead of home page.
      if (this.$route.query && this.$route.query["redirect"]) {
        const path = this.$route.query["redirect"] as string;
        this.$router.push(path);
      }
    }
  },

  mounted() {
    Auth.check();
  },

  created() {
    this.log = this.$logger.component(this);
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
      <TopNavigation :isCollapse="isCollapse" @collapse="collapse" />
    </el-header>
    <el-container>
      <el-aside width="200px">
        <AsideNavigation :isCollapse="isCollapse" class="el-menu-vertical" />
      </el-aside>
      <el-main :style="mainStyles">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss">
@import "~assets/styles";

.el-header {
  background-color: $--color-primary;
  color: $--color-info-light;
}

.el-main {
  transition: $--all-transition;
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 199px;
}
</style>
