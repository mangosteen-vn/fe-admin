/**
 * plugins/axios.ts
 *
 * Framework documentation: https://github.com/michalsnik/aos`
 */
// @ts-ignore
import aos from 'aos'
import 'aos/dist/aos.css'
export const AOS = {
  install: () => new aos.init()
}
