import { Nav, NavElement } from "crip-vue-bootstrap"
import Vue from "vue"

import {
  i18n,
  ILocale,
  locales as AppLocales,
  LocaleType,
  SetLocale,
} from "@/Lang"

import * as routes from "@/Router/Routes"
import store from "@/Store"

import Auth, { middleware as auth, roles } from "./Auth"

const canManage = () => auth.hasAnyRole(roles.all)

export const leftNav = () => {
  if (!auth.isAuthenticated() || !canManage()) {
    // Left menu is available only for users with access to manage
    return []
  }

  const nav = Nav.group(t("nav.manage"))
  const canManagePosts = auth.hasAnyRole(roles.posts)
  const canManageCM = auth.hasAnyRole(roles.competitions)

  if (canManagePosts) {
    if (auth.hasRole(roles.CREATE_POST)) {
      nav.create({ text: t("nav.create_post"), route: routes.createPost })
    }

    nav.create({ text: t("nav.manage_posts"), route: routes.managePosts })
    nav.add(Nav.divider())
  }

  if (auth.hasRole(roles.CREATE_TEAMS)) {
    nav.create({ text: t("nav.create_team"), route: routes.createTeam })
    nav.create({ text: t("nav.manage_teams"), route: routes.manageTeams })
    nav.add(Nav.divider())
  }

  if (canManageCM) {
    if (auth.hasRole(roles.CREATE_COMPETITIONS)) {
      nav.create({
        route: routes.createCompetition,
        text: t("nav.create_competition"),
      })
    }

    nav.create({
      route: routes.manageCompetitions,
      text: t("nav.manage_competitions"),
    })
    nav.add(Nav.divider())
  }

  // delete last divider from manage nav
  nav.items.splice(-1, 1)

  return [nav]
}

export const rightNav = () => {
  const nav: NavElement[] = [localesNav()]

  if (!auth.isAuthenticated()) {
    nav.push(Nav.item({ text: t("nav.login"), route: routes.login }))
    nav.push(Nav.item({ text: t("nav.signup"), route: routes.signUp }))
    return nav
  }

  nav.push(
    Nav.group(store.state.auth.user.name, [
      // TODO: add profile menu item
      // TODO: add messages menu item
      Nav.item({ text: t("nav.profile"), route: routes.profile }),
      Nav.item({ text: t("nav.logout"), click: Auth.logout }),
    ]),
  )

  return nav
}

function localesNav() {
  const locales = Nav.group(t("nav.locale"))
  Object.keys(AppLocales).forEach(key => {
    const locale: ILocale = AppLocales[key as LocaleType]
    locales.create({
      click: () => SetLocale(locale.key),
      isActive: t("nav.locale") === locale.text,
      text: locale.text,
    })
  })

  return locales
}

function t(key: string): string {
  return i18n.t(key) as string
}
