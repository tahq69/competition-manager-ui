import Vue from 'vue'
import {Logger} from '../Helpers/Logger'

declare module 'vue/types/vue' {
  interface Vue {
    $logger: Logger
  }

  interface VueConstructor {
    logger: Logger
  }
}