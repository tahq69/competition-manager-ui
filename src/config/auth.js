export const STATUS = 'local';

let secrets = {
  API_LOCAL: 'gxoANI7zlpPL3RMnWS2vi4inlp6WkVmFajKXGYTs',
  API_PRODUCTION: 'gxoANI7zlpPL3RMnWS2vi4inlp6WkVmFajKXGYTs',
}

export const BASE_URL = {
  'local': 'http://competition-manager.dev',
  'production': 'http://auth-cm.crip.lv',
}

export const API_URL = `${BASE_URL[STATUS]}/api/`
export const BASE_TOKEN = BASE_URL[STATUS]

function getSecret(value = '') {
  return `API_${value.toUpperCase()}`
}

let secret = getSecret(STATUS);
const CLIENT_SECRET = secrets[secret]

export default {
  oauth: {
    grant_type: 'password',
    client_id: 4,
    client_secret: CLIENT_SECRET,
    scope: ''
  },
  oauth_type: 'Bearer',
  default_storage: 'LocalStorage',
}
