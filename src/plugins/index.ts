import type { App } from 'vue'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
import '@/plugins/axios'
import '@/plugins/bootstrap'
import '@/plugins/toast'
import firebase from '@/plugins/firebase'
/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */
export function registerPlugins(app: App) {
  app.use(vuetify)
  app.use(firebase)
  loadFonts()
}
