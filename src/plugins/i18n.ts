// @ts-ignore
import { createI18n } from 'vue-i18n'
import enLocale from '@/locales/en.json'
import viLocale from '@/locales/vi.json'

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('userLanguage'),
  fallbackLocale: 'en',
  messages: {
    en: enLocale,
    vi: viLocale
  }
})

export default i18n
