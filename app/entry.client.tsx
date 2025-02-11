import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend/cjs' // The configuration file we created
import { resolve } from 'pathe'
import { StrictMode, startTransition } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import { HydratedRouter } from 'react-router/dom'
import { getInitialNamespaces } from 'remix-i18next/client'
import i18nConfig from './localization/i18n.config'

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(Backend)
  .init({
    ...i18nConfig,
    ns: getInitialNamespaces(),
    backend: { loadPath: resolve('./locales/{{lng}}/{{ns}}.json') },
    detection: {
      order: ['session', 'htmlTag'],
      caches: ['session'],
    },
    react: { useSuspense: true },
  })
  .then(() => {
    // After i18next init, hydrate the app
    startTransition(() => {
      hydrateRoot(
        document,
        <I18nextProvider i18n={i18next}>
          <StrictMode>
            <HydratedRouter />
          </StrictMode>
        </I18nextProvider>
      )
    })
  })
