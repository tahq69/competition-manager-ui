import Vue from "vue";

import { IConfig } from "@/config/typings";
import settings from "@/config/settings.json";

var env = settings.env as "local" | "production";
export const config = settings[env] as IConfig;

export * from "@/config/typings";

Object.defineProperty(Vue.prototype, "_config", { get: () => config });
