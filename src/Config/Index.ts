import LoggerOptions from './LoggerOptions'
import settings from './settings.json'

interface Config {
  auth_secret: string
  auth_token_type: string
  auth_id: number
  url: string
  api_url: string
  server_date_format: string
  default_locale: string
  logs: LoggerOptions
}

const config = settings[settings['env']] as Config

export default config
