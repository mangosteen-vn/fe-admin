/**
 * plugins/toast.ts
 *
 * Framework documentation: https://github.com/Maronato/vue-toastification`
 */
// @ts-ignore
import { createApp } from 'vue'
// @ts-ignore
import Toast, { PluginOptions, TYPE } from 'vue-toastification'
// Import the CSS or use your own!
import 'vue-toastification/dist/index.css'

// @ts-ignore
const app = createApp()

const options: PluginOptions = {
  toastDefaults: {
    [TYPE.SUCCESS]: {
      timeout: 5000,
      showCloseButtonOnHover: true,
      hideProgressBar: true,
      draggablePercent: 2,
      icon: {
        iconClass: 'material-icons-round',
        iconChildren: 'done',
        iconTag: 'span'
      }
    }
  }
}

app.use(Toast, options)
