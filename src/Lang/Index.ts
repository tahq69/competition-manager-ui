import VueI18n from 'vue-i18n'
import Vue from 'vue'

import { LocaleType } from '@/Lang/Contract'
import { loadLocale, saveLocale } from '@/Config/Locale'
import en from './en'
import lv from './lv'

Vue.use(VueI18n)

const translations = { en, lv }

export interface Locale {
  key: LocaleType
  text: string
}

export const locales: {[TKey in LocaleType]: Locale} = {
  lv: { key: 'lv', text: lv.locale },
  en: { key: 'en', text: en.locale },
}

export const i18n = new VueI18n({
  locale: 'lv',
  fallbackLocale: 'en',
  messages: translations,
})

export function SetLocale(locale: LocaleType = 'lv') {
  saveLocale(locale)
  i18n.locale = locale
}

export default function () {
  const locale = loadLocale()
  SetLocale(locale)
}
