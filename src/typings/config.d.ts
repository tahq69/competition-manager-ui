import { IConfig } from "@/config";
import Vue from "vue";

declare module "vue/types/vue" {
  interface Vue {
    _config: IConfig;
  }
}
