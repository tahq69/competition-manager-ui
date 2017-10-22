import {LocaleMessageObject} from 'vue-i18n'
/*import {NavLang} from '@/Components/Nav/Lang'
import {PostsLang} from '@/Modules/Posts/Lang'
import {AuthLang} from '@/Modules/Auth/Lang'*/

export type LocaleType = 'lv' | 'en'

export interface Api extends LocaleMessageObject {
  actionNotAllowed: string
  unknownHttpError: string
  unexpectedError: string
}

export default interface Lang extends LocaleMessageObject {
  locale: string
  appTitle: string
  api: Api
  /*posts: PostsLang
  nav: NavLang
  auth: AuthLang*/
}