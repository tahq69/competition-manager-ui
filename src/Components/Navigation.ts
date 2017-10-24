import Vue from 'vue'

import { locales as AppLocales, SetLocale, Locale, i18n } from '@/Lang'
import store from '@/Store'
import * as routes from '@/Router/Routes'

import { NavGroup, NavItem, NavItemType } from './Nav'
import Auth, { roles, middleware as auth } from './Auth'

import Navbar from './Nav/TheNavbar.vue'
import NavbarItems from './Nav/NavbarItems.vue'
import NavbarGroup from './Nav/NavbarGroup.vue'
import NavbarItem from './Nav/NavbarItem.vue'

Vue.component('Navbar', Navbar)
Vue.component('NavbarItems', NavbarItems)
Vue.component('NavbarGroup', NavbarGroup)
Vue.component('NavbarItem', NavbarItem)

const canManage = () => auth.hasAnyRole(roles.all)

export const left = (): NavGroup[] => {
  if (!auth.isAuthenticated() || !canManage()) {
    // Left menu is available only for users with access to manage
    return []
  }

  const nav = new NavGroup('Manage')
  const canManagePosts = auth.hasAnyRole(roles.posts)
  const canManageCM = auth.hasAnyRole(roles.competitions)
  const divider = new NavItem({ divider: true })

  if (canManagePosts) {
    if (auth.hasRole(roles.CREATE_POST)) {
      nav.create({ text: 'Create post', route: routes.createPost })
    }

    nav.create({ text: 'Posts', route: routes.listPosts })
    nav.add(divider)
  }

  if (auth.hasRole(roles.CREATE_TEAMS)) {
    nav.create({ text: 'Create team', route: routes.createTeam })
    nav.create({ text: 'Teams', route: routes.listTeams })
    nav.add(divider)
  }

  if (canManageCM) {
    if (auth.hasRole(roles.CREATE_COMPETITIONS)) {
      nav.create({ text: 'Create competition', route: routes.createCompetition })
    }

    nav.create({ text: 'Competition', route: routes.listCompetitions })
    nav.add(divider)
  }

  // delete last divider from manage nav
  nav.items.splice(-1, 1)

  return [nav]
}

export const right = () => {
  const nav: NavItemType[] = [localesNav()]

  if (!auth.isAuthenticated()) {
    nav.push(new NavItem({ text: t('nav.login'), route: routes.login }))
    nav.push(new NavItem({ text: t('nav.signup'), route: routes.signUp }))
    return nav
  }

  nav.push(new NavGroup(
    store.state.auth.user.name,
    [
      // TODO: add profile menu item
      // TODO: add messages menu item
      new NavItem({ text: t('nav.profile'), route: routes.profile }),
      new NavItem({ text: t('nav.logout'), click: Auth.logout })
    ]
  ))

  return nav
}

function localesNav() {
  const locales = new NavGroup(t('nav.locale'))
  Object.keys(AppLocales).forEach(key => {
    const locale: Locale = AppLocales[key]
    locales.create({
      text: locale.text,
      click: () => SetLocale(locale.key),
      isActive: t('nav.locale') == locale.text
    })
  })

  return locales
}

function t(key: string): string {
  return i18n.t(key) as string
}
