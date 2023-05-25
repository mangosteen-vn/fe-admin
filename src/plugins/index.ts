import type {App} from "vue";
import vuetify from "@/plugins/vuetify";
import {loadFonts} from "@/plugins/webfontloader";
/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */
export function registerPlugins(app: App){
    app.use(vuetify)
    loadFonts()
}