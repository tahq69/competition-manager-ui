import config from '@/Config'
import { LocaleType } from '@/Lang/Contract'
import LocalStorage from '@/Helpers/LocalStorage'

const storageKey = 'crip-cm-locale'

export function loadLocale(): LocaleType {
  // TODO: move localStorage to external class as a helper
  let locale = LocalStorage.get(storageKey)
  if (locale === 'lv' || locale === 'en') {
    return locale as LocaleType
  }

  return config.default_locale as LocaleType
}

export function saveLocale(locale: LocaleType): void {
  LocalStorage.set(storageKey, locale)
}
