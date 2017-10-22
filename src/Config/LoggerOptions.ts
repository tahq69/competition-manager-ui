export default interface LoggerOptions {
  /**
   * Logging placement area.
   * 'console' - logs all sections to the browser console
   * false     - disables all logs
   */
  logs: string | boolean

  /**
   * List of enabled log sections.
   * To disable logs for some section, remove it from this list.
   */
  logSections: string[]
}