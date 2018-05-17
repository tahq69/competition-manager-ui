import Vue from "vue";

import { config, ILoggerOptions } from "@/config";

import { isInArray } from "./utils";

interface ILogWriterParams {
  type: LogType;
  args: any[];
  section: string;
  isComponent?: boolean;
}

export type LogType = "log" | "info" | "warn" | "debug" | "error";

export interface ILogger {
  /**
   * Write log message.
   *
   * @param {...any[]} args
   * @memberof ILogger
   */
  log(...args: any[]): void;

  /**
   * Write informational message.
   *
   * @param {...any[]} args
   * @memberof ILogger
   */
  info(...args: any[]): void;

  /**
   * Write error message.
   *
   * @param {...any[]} args
   * @memberof ILogger
   */
  error(...args: any[]): void;

  /**
   * Group logs to section and get logger method.
   *
   * @param {string} section
   * @param {LogType} [type]
   * @returns {(...args: any[]) => void}
   * @memberof ILogger
   */
  group(section: string, type?: LogType): (...args: any[]) => void;

  /**
   * Log Vue component details.
   *
   * @param {Vue} vm
   * @param {...any[]} args
   * @returns {(...args: any[]) => void}
   * @memberof ILogger
   */
  component(vm: Vue, ...args: any[]): (...args: any[]) => void;
}

class WebLogger implements ILogger {
  private target: string | boolean;
  private sections: string[];

  public constructor({ target, sections }: ILoggerOptions) {
    this.target = target;
    this.sections = sections;
  }

  public log(...args: any[]) {
    this.writeLog({ type: "log", args, section: "global" });
  }

  public info(...args: any[]) {
    this.writeLog({ type: "info", args, section: "info" });
  }

  public error(...args: any[]) {
    this.writeLog({ type: "error", args, section: "error" });
  }

  public group(section: string, type: LogType = "log", isComponent = false) {
    return (...args: any[]) => {
      args.unshift(section);
      this.writeLog({ type, args, section, isComponent });
    };
  }

  public component(vm: Vue, ...args: any[]) {
    const component = vm.$options.name;
    let logArguments = [component, ...args];

    if (vm.$route) {
      const route = { ...vm.$route.params, path: vm.$route.fullPath };
      logArguments = [component, { route }, ...args];
    }

    this.writeLog({
      type: "debug",
      args: logArguments,
      section: "component",
      isComponent: true
    });

    return this.group(vm.$options.name || "unnamed", "log", true);
  }

  private writeLog(params: ILogWriterParams) {
    const section = params.isComponent ? "component" : params.section;
    if (!this.isInAvailableSections(section)) return;

    if (this.target === "console") {
      return this.consoleLog(params.type, params.args);
    }
  }

  private consoleLog(type: LogType, args: any[]) {
    if (window.console && console[type]) {
      console[type].apply(console, args);
    }
  }

  private isInAvailableSections(section: string): boolean {
    if (!this.sections || this.sections.length < 1) return true;
    return isInArray(section, this.sections);
  }
}

const logger = new WebLogger(config.logs);
const attrs = { get: () => logger };

Object.defineProperty(Vue, "logger", attrs);
Object.defineProperty(Vue.prototype, "$logger", attrs);

/*
export default {
  install(vueInstance: typeof Vue, options?: ILoggerOptions) {
    if (!options) throw new Error("Logger options required")

    const logger = new WebLogger(options)
    const attrs = { get: () => logger }

    Object.defineProperty(vueInstance, "logger", attrs)
    Object.defineProperty(vueInstance.prototype, "$logger", attrs)
  },
}*/
