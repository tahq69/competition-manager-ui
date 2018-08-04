import Vue from "vue";
//import { DateTime } from "luxon";

import { IConfig } from "@/config/typings";
import settings from "@/config/settings.json";

export const config = settings[settings["env"]] as IConfig;
//config.dateFormat = DateTime.DATE_SHORT;
//config.dateTimeFormat = DateTime.DATETIME_SHORT;

export * from "@/config/typings";

Object.defineProperty(Vue.prototype, "_config", { get: () => config });
