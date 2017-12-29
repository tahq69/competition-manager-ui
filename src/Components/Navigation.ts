import Vue from "vue"

import { i18n, ILocale, locales as AppLocales, LocaleType, SetLocale } from "@/Lang"
import * as routes from "@/Router/Routes"
import store from "@/Store"

import Auth, { middleware as auth, roles } from "./Auth"
import { NavGroup, NavItem, NavItemType } from "./Nav"

import NavbarGroup from "./Nav/NavbarGroup.vue"
import NavbarItem from "./Nav/NavbarItem.vue"
import NavbarItems from "./Nav/NavbarItems.vue"
import Navbar from "./Nav/TheNavbar.vue"

Vue.component("Navbar", Navbar)
Vue.component("NavbarItems", NavbarItems)
Vue.component("NavbarGroup", NavbarGroup)
Vue.component("NavbarItem", NavbarItem)

const canManage = () => auth.hasAnyRole(roles.all)

export const left = () => {
  if (!auth.isAuthenticated() || !canManage()) {
    // Left menu is available only for users with access to manage
    return []
  }

  const nav = new NavGroup(t("nav.manage"))
  const canManagePosts = auth.hasAnyRole(roles.posts)
  const canManageCM = auth.hasAnyRole(roles.competitions)

  if (canManagePosts) {
    if (auth.hasRole(roles.CREATE_POST)) {
      nav.create({ text: t("nav.create_post"), route: routes.createPost })
    }

    nav.create({ text: t("nav.manage_posts"), route: routes.managePosts })
    nav.add(new NavItem({ divider: true }))
  }

  if (auth.hasRole(roles.CREATE_TEAMS)) {
    nav.create({ text: t("nav.create_team"), route: routes.createTeam })
    nav.create({ text: t("nav.manage_teams"), route: routes.manageTeams })
    nav.add(new NavItem({ divider: true }))
  }

  if (canManageCM) {
    if (auth.hasRole(roles.CREATE_COMPETITIONS)) {
      nav.create({
        text: t("nav.create_competition"),
        route: routes.createCompetition,
      })
    }

    nav.create({
      text: t("nav.manage_competitions"),
      route: routes.manageCompetitions,
    })
    nav.add(new NavItem({ divider: true }))
  }

  // delete last divider from manage nav
  nav.items.splice(-1, 1)

  return [nav]
}

export const right = () => {
  const nav: NavItemType[] = [localesNav()]

  if (!auth.isAuthenticated()) {
    nav.push(new NavItem({ text: t("nav.login"), route: routes.login }))
    nav.push(new NavItem({ text: t("nav.signup"), route: routes.signUp }))
    return nav
  }

  nav.push(
    new NavGroup(store.state.auth.user.name, [
      // TODO: add profile menu item
      // TODO: add messages menu item
      new NavItem({ text: t("nav.profile"), route: routes.profile }),
      new NavItem({ text: t("nav.logout"), click: Auth.logout }),
    ]),
  )

  return nav
}

function localesNav() {
  const locales = new NavGroup(t("nav.locale"))
  Object.keys(AppLocales).forEach(key => {
    const locale: ILocale = AppLocales[key as LocaleType]
    locales.create({
      text: locale.text,
      click: () => SetLocale(locale.key),
      isActive: t("nav.locale") === locale.text,
    })
  })

  return locales
}

function t(key: string): string {
  return i18n.t(key) as string
}
