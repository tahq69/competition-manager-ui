import Vue from 'vue'
import {ILogger} from '../Helpers/Logger'

declare module 'vue/types/vue' {
  interface Vue {
    $logger: ILogger
  }

  interface VueConstructor {
    logger: ILogger
  }
}