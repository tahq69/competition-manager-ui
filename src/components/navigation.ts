import { Nav, NavElement } from "crip-vue-bootstrap";
import Vue from "vue";

import {
  i18n,
  ILocale,
  locales as AppLocales,
  LocaleType,
  SetLocale
} from "@/lang";

import * as routes from "@/router/routes";
import { store } from "@/store";

import Auth, { middleware as auth, roles } from "./auth";

const manageRoles = [
  roles.CREATE_POST,
  roles.MANAGE_POSTS,
  roles.MANAGE_USERS,
  roles.MANAGE_USER_ROLES,
  roles.CREATE_TEAMS
];
const canManage = () => auth.hasAnyRole(manageRoles);

export const leftNav = () => {
  const publicNav = [
    Nav.item({ text: t("competitions"), route: routes.competitions }),
    Nav.item({ text: t("teams"), route: routes.teams })
  ];

  if (!auth.isAuthenticated() || !canManage()) {
    // Left menu is available only for users with access to manage
    return publicNav;
  }

  const nav = Nav.group(t("manage"));
  const canManagePosts = auth.hasAnyRole([
    roles.CREATE_POST,
    roles.MANAGE_POSTS
  ]);

  if (canManagePosts) {
    if (auth.hasRole(roles.CREATE_POST)) {
      nav.create({ text: t("create_post"), route: routes.createPost });
    }

    nav.create({ text: t("manage_posts"), route: routes.managePosts });
    nav.add(Nav.divider());
  }

  if (auth.hasRole(roles.SUPER_ADMIN)) {
    /*nav.create({
      text: t("create_competition"),
      route: routes.createCompetition,
    })*/

    nav.create({
      text: t("manage_competitions"),
      route: routes.manageCompetitions
    });

    nav.add(Nav.divider());
  }

  if (auth.hasRole(roles.CREATE_TEAMS)) {
    nav.create({ text: t("create_team"), route: routes.createTeam });
    nav.create({ text: t("manage_teams"), route: routes.manageTeams });
    nav.add(Nav.divider());
  }

  // delete last divider from manage nav
  nav.items.splice(-1, 1);

  return [nav, ...publicNav];
};

export const rightNav = () => {
  const nav: NavElement[] = [localesNav()];

  if (!auth.isAuthenticated()) {
    nav.push(Nav.item({ text: t("login"), route: routes.login }));
    nav.push(Nav.item({ text: t("signup"), route: routes.signUp }));
    return nav;
  }

  nav.push(
    Nav.group(store.state.auth.user.name, [
      // TODO: add profile menu item
      // TODO: add messages menu item
      Nav.item({ text: t("profile"), route: routes.authProfile }),
      Nav.item({ text: t("logout"), click: Auth.logout })
    ])
  );

  return nav;
};

function localesNav() {
  const locales = Nav.group(t("locale"));
  Object.keys(AppLocales).forEach(key => {
    const locale: ILocale = AppLocales[key as LocaleType];
    locales.create({
      click: () => SetLocale(locale.key),
      isActive: t("locale") === locale.text,
      text: locale.text
    });
  });

  return locales;
}

function t(key: string): string {
  return i18n.t(`app.nav_${key}`) as string;
}
