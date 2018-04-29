import config from "@/config";
import LocalStorage from "@/helpers/local-storage";
import { LocaleType } from "@/lang/typings";

const storageKey = "crip-cm-locale";

export function loadLocale(): LocaleType {
  const locale = LocalStorage.get(storageKey);
  if (locale === "lv" || locale === "en") {
    return locale as LocaleType;
  }

  return config.default_locale as LocaleType;
}

export function saveLocale(locale: LocaleType): void {
  LocalStorage.set(storageKey, locale);
}
