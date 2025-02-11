const i18n = {
  // This is the list of languages your application supports
  supportedLngs: ['ar', 'en'],
  // This is the language you want to use in case
  // if the user language is not in the supportedLngs
  fallbackLng: 'ar',
  // The default namespace of i18next is "translation", but you can customize it here
  defaultNS: 'common',
  react: { useSuspense: false },
  backend: {
    loadPath: 'locales/{{lng}}/{{ns}}.json',
  },
}

export default i18n
