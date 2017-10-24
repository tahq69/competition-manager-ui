export const STATUS = 'local'

let secrets = {
  API_LOCAL: 'bnHIar11g4qinn2LrbjCiBqHrRJ1rlOAqB1MgpUU',
  API_PRODUCTION: 'bnHIar11g4qinn2LrbjCiBqHrRJ1rlOAqB1MgpUU',
}

export const BASE_URL = {
  'local': 'http://competition-manager.dev',
  'production': 'http://cm.crip.lv',
}

export const API_URL = `${BASE_URL[STATUS]}/api/`
export const BASE_TOKEN = BASE_URL[STATUS]

function getSecret(value = '') {
  return `API_${value.toUpperCase()}`
}

let secret = getSecret(STATUS);
const CLIENT_SECRET = secrets[secret]

export default {
  client_id: 1,
  client_secret: CLIENT_SECRET,
  token_type: 'Bearer',
}
