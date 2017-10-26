import Vue from "vue"

import ILoggerOptions from "./../Config/LoggerOptions"
import Utils from "./Utils"

export type LogType = "log" | "info" | "warn" | "debug" | "error"

export interface ILogger {
  /**
   * Write log message.
   *
   * @param {...any[]} args
   * @memberof ILogger
   */
  log(...args: any[]): void

  /**
   * Write informational message.
   *
   * @param {...any[]} args
   * @memberof ILogger
   */
  info(...args: any[]): void

  /**
   * Write error message.
   *
   * @param {...any[]} args
   * @memberof ILogger
   */
  error(...args: any[]): void

  /**
   * Group logs to section and get logger method.
   *
   * @param {string} section
   * @param {LogType} [type]
   * @returns {(...args: any[]) => void}
   * @memberof ILogger
   */
  group(section: string, type?: LogType): (...args: any[]) => void

  /**
   * Log Vue component details.
   *
   * @param {Vue} vm
   * @param {...any[]} args
   * @memberof ILogger
   */
  component(vm: Vue, ...args: any[]): void
}

class WebLogger implements ILogger {
  private target: string | boolean
  private sections: string[]

  public constructor({ target, sections }: ILoggerOptions) {
    this.target = target
    this.sections = sections
  }

  public log(...args: any[]) {
    this.writelog("log", args)
  }

  public info(...args: any[]) {
    this.writelog("info", args, "info")
  }

  public error(...args: any[]) {
    this.writelog("error", args, "error")
  }

  public group(section: string, type: LogType = "log") {
    return (...args: any[]) => {
      args.unshift(section)
      this.writelog(type, args, section)
    }
  }

  public component(vm: Vue, ...args: any[]) {
    const route = { ...vm.$route.params, path: vm.$route.fullPath }
    const debugArgs = [`component ${vm.$options.name}`, { route }, ...args]

    this.writelog("debug", debugArgs, "component")
  }

  private writelog(type: LogType, args: any, section = "global") {
    if (!this.isInAvailableSections(section)) return

    if (this.target === "console") {
      return this.consoleLog(type, args)
    }
  }

  private consoleLog(type: LogType, args: any) {
    if (window.console && console[type]) {
      console[type].apply(console, args)
    }
  }

  private isInAvailableSections(section: string): boolean {
    return Utils.isInArray(section, this.sections)
  }
}

export default {
  install(VueInstance: typeof Vue, options: ILoggerOptions) {
    const logger = new WebLogger(options)
    VueInstance.logger = logger

    Object.defineProperties(VueInstance.prototype, {
      $logger: { get: () => logger },
    })
  },
}
