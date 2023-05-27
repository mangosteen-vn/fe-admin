/**
 * plugins/firebase.js
 *
 * Framework documentation: https://firebase.google.com/docs/auth`
 */
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyC4w4cRJUiLo9DMdibkPTcHf6_7qn5w7uQ',
  authDomain: 'nuxt-firebase-development.firebaseapp.com',
  projectId: 'nuxt-firebase-development',
  storageBucket: 'nuxt-firebase-development.appspot.com',
  messagingSenderId: '706366653686',
  appId: '1:706366653686:web:342a20903e613cd2d598d7',
  measurementId: 'G-1YYLW4YK8Z'
}

const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp)
export const auth = getAuth(firebaseApp)
export default function install(app: any) {
  app.config.globalProperties.$db = db
  app.config.globalProperties.$auth = auth
}
