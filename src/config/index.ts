import { DateTime, DateTimeFormatOptions } from "luxon";

import ILoggerOptions from "./logger-options";
import settings from "./settings.json";

export interface IConfig {
  auth_secret: string;
  auth_token_type: string;
  auth_id: number;
  url: string;
  api_url: string;
  server_date_format: string;
  default_locale: string;
  logs: ILoggerOptions;
  dateFormat: DateTimeFormatOptions;
  dateTimeFormat: DateTimeFormatOptions;
}

const config = settings[settings["env"]] as IConfig;
config.dateFormat = DateTime.DATE_SHORT;
config.dateTimeFormat = DateTime.DATETIME_SHORT_WITH_SECONDS;

export default config;
