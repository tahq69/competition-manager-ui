import Vue from "vue"
import { ILogger } from "@/Helpers/Logger"

declare module "vue/types/vue" {
  interface Vue {
    $logger: ILogger
    log: (...args: any[]) => void
  }

  interface VueConstructor {
    logger: ILogger
  }
}
