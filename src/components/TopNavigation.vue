<script lang="ts">
import Vue from "vue";
import Auth, { middleware as auth, roles } from "@/components/auth";
import { locales, LocaleType, ILocale, i18n, SetLocale } from "@/lang";
import * as routes from "@/router/routes";

type Locale = { key: LocaleType; text: string };
type Locales = Locale[];

export default Vue.extend({
  name: "TopNavigation",

  props: {
    isCollapse: { type: Boolean, required: true }
  },

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

    activeIndex(): string | undefined {
      return this.$route.name;
    }
  },

  methods: {
    t(key: string): string {
      return i18n.t(`app.nav_${key}`).toString();
    },

    userAction(command: string) {
      if (command === "logout") {
        Auth.logout();
        return;
      }

      this.goTo({ name: command });
    },

    goTo(route: any) {
      this.$router.push(route);
    },

    setLocale(key: LocaleType) {
      SetLocale(key);
    }
  },

  created() {
    this.log = this.$logger.component(this);
  }
});
</script>

<template>
  <el-row type="flex"
          justify="space-between">

    <el-col :span="12">
      <a href="#"
         class="toggle-aside"
         @click.prevent="$emit('collapse')">
        <i class="el-icon-menu"></i>
      </a>
      <h1 class="application-title"
          @click="goTo(routes.home)">{{ $t('app.title') }}</h1>
    </el-col>

    <el-col :span="12">

      <el-dropdown v-if="isAuthenticated"
                   trigger="click"
                   @command="userAction"
                   class="top-navigation-dropdown">
        <span class="el-dropdown-link">
          {{ userName }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item :command="routes.authProfile.name">{{ t("profile") }}</el-dropdown-item>
          <el-dropdown-item command="logout">{{ t("logout") }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <template v-else>
        <el-button type="text"
                   @click="goTo(routes.login)"
                   class="top-navigation-btn">{{ t("login") }}</el-button>
        <el-button type="text"
                   @click="goTo(routes.signUp)"
                   class="top-navigation-btn">{{ t("signup") }}</el-button>
      </template>

      <el-dropdown :hide-on-click="false"
                   trigger="click"
                   @command="setLocale"
                   class="top-navigation-dropdown">
        <span class="el-dropdown-link">
          {{ t("locale") }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="locale in locales"
                            :key="locale.key"
                            :command="locale.key">{{ locale.text }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>

  </el-row>
</template>

<style lang="scss">
@import "~assets/variables";

a.toggle-aside {
  color: $--color-info-light;
  font-size: 18px;
  height: 60px;
  line-height: 60px;
  display: inline-block;
  padding: 0 20px;
  margin-left: -20px;

  &:hover {
    color: $--color-white;
  }
}

.application-title {
  display: inline-block;
  cursor: pointer;
  margin: 0;
  font-size: 1.5em;

  &:hover {
    color: $--color-white;
  }
}

.top-navigation-dropdown {
  float: right;
  margin-left: 20px;

  .el-dropdown-link {
    color: $--color-info-light;
    cursor: pointer;
    display: block;
    height: 60px;
    line-height: 60px;

    &:hover {
      color: $--color-white;
    }
  }
}

button.top-navigation-btn {
  color: $--color-info-light;
  float: right;
  margin-left: 20px !important;
  height: 60px;
  line-height: 60px;
  padding: 0;

  &:hover {
    color: $--color-white;
  }
}
</style>
