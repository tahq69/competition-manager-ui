import config from "@/Config"
import LocalStorage from "@/Helpers/LocalStorage"
import { LocaleType } from "@/Lang/Contract"

const storageKey = "crip-cm-locale"

export function loadLocale(): LocaleType {
  // TODO: move localStorage to external class as a helper
  const locale = LocalStorage.get(storageKey)
  if (locale === "lv" || locale === "en") {
    return locale as LocaleType
  }

  return config.default_locale as LocaleType
}

export function saveLocale(locale: LocaleType): void {
  LocalStorage.set(storageKey, locale)
}
