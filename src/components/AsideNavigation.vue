<script lang="ts">
import Vue from "vue";
import Auth, { middleware as auth, roles } from "@/components/auth";
import { locales, LocaleType, ILocale, i18n, SetLocale } from "@/lang";
import * as routes from "@/router/routes";

type Locale = { key: LocaleType; text: string };
type Locales = Locale[];

export default Vue.extend({
  name: "AsideNavigtion",

  props: {
    isCollapse: { type: Boolean, required: true }
  },

  data: () => ({ routes }),

  computed: {
    isAuthenticated(): boolean {
      return auth.isAuthenticated();
    },

    activeIndex(): string | undefined {
      return this.$route.name;
    },

    canManage(): boolean {
      return auth.hasAnyRole([
        roles.CREATE_POST,
        roles.MANAGE_POSTS,
        roles.MANAGE_USERS,
        roles.MANAGE_USER_ROLES,
        roles.CREATE_TEAMS
      ]);
    },

    canManagePosts(): boolean {
      return auth.hasAnyRole([roles.CREATE_POST, roles.MANAGE_POSTS]);
    },

    canManageCompetitions(): boolean {
      return auth.hasRole(roles.SUPER_ADMIN);
    },

    canManageTeams(): boolean {
      return auth.hasRole(roles.CREATE_TEAMS);
    }
  },

  methods: {
    t(key: string): string {
      return i18n.t(`app.nav_${key}`).toString();
    },

    handleSelect(key: string, keyPath: string[]) {
      this.$router.push({ name: key });
    }
  },

  created() {
    this.log = this.$logger.component(this);
  }
});
</script>

<template>
  <el-menu :default-active="activeIndex"
           :collapse="isCollapse"
           @select="handleSelect">
    <el-submenu v-if="isAuthenticated && canManage"
                index="management">
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span>{{ t("manage") }}</span>
      </template>

      <el-menu-item v-if="canManagePosts"
                    :index="routes.managePosts.name">
        {{ t("manage_posts") }}
      </el-menu-item>

      <el-menu-item v-if="canManageCompetitions"
                    :index="routes.manageCompetitions.name">
        {{ t("manage_competitions") }}
      </el-menu-item>

      <el-menu-item v-if="canManageTeams"
                    :index="routes.manageTeams.name">
        {{ t("manage_teams") }}
      </el-menu-item>
    </el-submenu>

    <el-menu-item :index="routes.competitions.name">
      <i class="el-icon-document"></i>
      <span slot="title">{{ t("competitions") }}</span>
    </el-menu-item>

    <el-menu-item :index="routes.teams.name">
      <i class="el-icon-menu"></i>
      <span slot="title">{{ t("teams") }}</span>
    </el-menu-item>
  </el-menu>
</template>
