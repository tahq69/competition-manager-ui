export default interface ILoggerOptions {
  /**
   * Logging placement area.
   * 'console' - logs all sections to the browser console
   * 'db'      - send logs to database
   * false     - disables all logs
   */
  target: string | boolean;

  /**
   * List of enabled log sections.
   * To disable logs for some section, remove it from this list.
   */
  sections: string[];
};
