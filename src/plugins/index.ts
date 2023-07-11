// @ts-ignore
import type { App } from 'vue'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
import '@/plugins/axios'
import '@/plugins/bootstrap'
import '@/plugins/toast'
import firebase from '@/plugins/firebase'
import { AOS } from '@/plugins/aos'
import i18n from '@/plugins/i18n'
import 'perfect-scrollbar/css/perfect-scrollbar.css'

/**
 * plugins/edit.ts
 *
 * Automatically included in `./src/main.ts`
 */
export function registerPlugins(app: App) {
  app.use(vuetify)
  app.use(firebase)
  app.use(AOS)
  app.use(i18n)
  loadFonts()
}
