<script lang="ts">
import Vue from "vue";
import Auth, { middleware as auth, roles } from "@/components/auth";
import { locales, LocaleType, ILocale, i18n, SetLocale } from "@/lang";
import * as routes from "@/router/routes";

type Locale = { key: LocaleType; text: string };
type Locales = Locale[];

export default Vue.extend({
  name: "Navigation",

  data: () => ({ routes }),

  computed: {
    isAuthenticated(): boolean {
      return auth.isAuthenticated();
    },

    userName(): string {
      return this.$store.state.auth.user.name;
    },

    locales(): Locales {
      const result: Locales = [];

      Object.keys(locales).forEach(key => {
        const locale: ILocale = locales[key as LocaleType];
        result.push({
          key: locale.key,
          text: locale.text
        });
      });

      return result;
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
      this.log("handleSelect", { key, keyPath });
      if (keyPath.indexOf("locales") === 0) {
        SetLocale(key as LocaleType);
        return;
      }

      if (key === "logout") {
        return Auth.logout();
      }

      this.$router.push({ name: key });
    }
  },

  created() {
    this.log = this.$logger.component(this);
  }
});
</script>

<template>
  <el-menu mode="horizontal"
           @select="handleSelect">
    <el-submenu v-if="isAuthenticated && canManage">
      <template slot="title">{{ t("manage") }}</template>

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
      {{ t("competitions") }}
    </el-menu-item>

    <el-menu-item :index="routes.teams.name">
      {{ t("teams") }}
    </el-menu-item>

    <el-submenu v-if="isAuthenticated"
                index="user">
      <template slot="title">{{ userName }}</template>
      <el-menu-item :index="routes.profile.name">{{ t("profile") }}</el-menu-item>
      <el-menu-item @click="logout"
                    index="logout">
        {{ t("logout") }}
      </el-menu-item>
    </el-submenu>
    <template v-else>
      <el-menu-item :index="routes.login.name">{{ t("login") }}</el-menu-item>
      <el-menu-item :index="routes.signUp.name">{{ t("signup") }}</el-menu-item>
    </template>

    <el-submenu index="locales">
      <template slot="title">{{ t("locale") }}</template>

      <el-menu-item v-for="locale in locales"
                    :key="locale.key"
                    :index="locale.key">
        {{ locale.text }}
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>
