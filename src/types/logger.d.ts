import { ILogger } from "@/helpers/logger"
import Vue from "vue"

declare module "vue/types/vue" {
  interface Vue {
    $logger: ILogger
    log: (...args: any[]) => void
  }

  interface VueConstructor {
    logger: ILogger
  }
}
