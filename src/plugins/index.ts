import type { App } from 'vue'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
import '@/plugins/axios'
import '@/plugins/bootstrap'
import '@/plugins/toast'
import firebase from '@/plugins/firebase'
import { AOS } from '@/plugins/aos'
// @ts-ignore
import IconMail from '@/components/icons/aside/menu/IconMail.vue'
/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */
export function registerPlugins(app: App) {
  app.use(vuetify)
  app.use(firebase)
  app.use(AOS)
  loadFonts()
}
