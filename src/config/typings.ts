export interface ILoggerOptions {
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
}

export interface IConfig {
  auth_secret: string;
  auth_token_type: string;
  auth_id: number;
  url: string;
  api_url: string;
  server_date_format: string;
  date_format: string;
  date_time_format: string;
  logs: ILoggerOptions;

  // Element UI
  label_position: "left" | "right" | "top";
  label_width: string;
}
