import Vue from 'vue'

import LoggerOptions from './../Config/LoggerOptions'
import Utils from './Utils'

export type LogType = 'log' | 'info' | 'warn' | 'debug' | 'error'

export interface Logger {
  /**
   * Write log message.
   * 
   * @param {...any[]} args 
   * @memberof Logger
   */
  log(...args: any[]): void

  /**
   * Write informational message.
   * 
   * @param {...any[]} args 
   * @memberof Logger
   */
  info(...args: any[]): void

  /**
   * Write error message.
   * 
   * @param {...any[]} args 
   * @memberof Logger
   */
  error(...args: any[]): void

  /**
   * Group logs to section and get logger method.
   * 
   * @param {string} section 
   * @param {LogType} [type] 
   * @returns {(...args: any[]) => void} 
   * @memberof Logger
   */
  group(section: string, type?: LogType): (...args: any[]) => void

  /**
   * Log Vue component details.
   * 
   * @param {Vue} vm 
   * @param {...any[]} args 
   * @memberof Logger
   */
  component(vm: Vue, ...args: any[]): void
}

class WebLogger implements Logger {
  private logType: string | boolean
  private sections: string[]

  public constructor({logs, logSections}: LoggerOptions) {
    this.logType = logs
    this.sections = logSections
  }

  public log(...args: any[]) {
    this.writelog('log', args)
  }

  public info(...args: any[]) {
    this.writelog('info', args, 'info')
  }

  public error(...args: any[]) {
    this.writelog('error', args, 'error')
  }

  public group(section: string, type: LogType = 'log') {
    return (...args: any[]) => {
      args.unshift(section)
      this.writelog(type, args, section)
    }
  }

  public component(vm: Vue, ...args: any[]) {
    let route = {...vm.$route.params, path: vm.$route.fullPath}
    let debugArgs = [`component ${vm.$options.name}`, {route}, ...args]

    this.writelog('debug', debugArgs, 'component')
  }

  private writelog(type: LogType, args: any, section = 'global') {
    if (!this.isInAvailableSections(section)) return

    if (this.logType === 'console') {
      return WebLogger.consoleLog(type, args)
    }
  }

  private static consoleLog(type: LogType, args: any) {
    if (window.console && console[type]) {
      console[type].apply(console, args)
    }
  }

  private isInAvailableSections(section: string): boolean {
    return Utils.isInArray(section, this.sections)
  }
}

export default {
  install(VueInstance: typeof Vue, options: LoggerOptions) {
    const logger = new WebLogger(options)
    VueInstance.logger = logger

    Object.defineProperties(VueInstance.prototype, {
      '$logger': {get: () => logger}
    })
  }
}