import Backend from 'i18next-fs-backend/cjs'
import { resolve } from 'pathe'
import { RemixI18Next } from 'remix-i18next/server'
import { i18nCookieSessionStorage } from '~/sessions.server'
import i18nConfig from './i18n.config'

const i18next = new RemixI18Next({
  detection: {
    sessionStorage: i18nCookieSessionStorage,
    supportedLanguages: i18nConfig.supportedLngs,
    fallbackLanguage: i18nConfig.fallbackLng,
  },
  i18next: {
    ...i18nConfig,
    backend: { loadPath: resolve('./public/locales/{{lng}}/{{ns}}.json') },
  },
  plugins: [Backend],
})

export default i18next
