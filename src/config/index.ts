import ILoggerOptions from "./logger-options"
import settings from "./settings.json"

interface IConfig {
  auth_secret: string
  auth_token_type: string
  auth_id: number
  url: string
  api_url: string
  server_date_format: string
  default_locale: string
  logs: ILoggerOptions
}

const config = settings[settings["env"]] as IConfig

export default config
