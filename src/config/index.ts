import Vue from "vue";
//import { DateTime } from "luxon";

import { IConfig } from "./typings";
import settings from "./settings.json";

export const config = settings[settings["env"]] as IConfig;
//config.dateFormat = DateTime.DATE_SHORT;
//config.dateTimeFormat = DateTime.DATETIME_SHORT;

export * from "./typings";

Object.defineProperty(Vue.prototype, "_config", { get: () => config });
