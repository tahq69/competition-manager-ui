import Vue from "vue";
import VueI18n from "vue-i18n";
import dateUtil from "element-ui/src/utils/date";

import { config } from "@/config";
import { loadLocale, saveLocale } from "@/config/locale";
import { LocaleType } from "@/lang/typings";

import en from "./en";
import lv from "./lv";

Vue.use(VueI18n);

const translations = { en, lv };

export { LocaleType } from "@/lang/typings";

export interface ILocale {
  key: LocaleType;
  text: string;
}

export const locales: { [TKey in LocaleType]: ILocale } = {
  lv: { key: "lv", text: (lv as any).app.locale },
  en: { key: "en", text: (en as any).app.locale }
};

export const i18n = new VueI18n({
  locale: "lv",
  fallbackLocale: "en",
  messages: translations
});

config.date_format = t("app.date_format");
config.date_time_format = t("app.date_time_format");

export function SetLocale(locale: LocaleType = "lv") {
  saveLocale(locale);
  i18n.locale = locale;
}

export default function() {
  const locale = loadLocale();
  SetLocale(locale);
}

export function t(key: string): string {
  return i18n.t(key).toString();
}

export function d(date: string): string {
  if (!date) return "";

  const dateObj = dateUtil.parse(date, config.server_date_format) as Date;
  const dateStr = dateUtil.format(dateObj, "yyyy-MM-ddTHH:mm:ss");

  return dateStr;
}
