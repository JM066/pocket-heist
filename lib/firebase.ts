import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAM4qPdgGp3nxdGtV_I2Xrsi_zSYloDMVk',
  authDomain: 'pocket-heist-minalee.firebaseapp.com',
  projectId: 'pocket-heist-minalee',
  storageBucket: 'pocket-heist-minalee.firebasestorage.app',
  messagingSenderId: '393042196655',
  appId: '1:393042196655:web:52550e020f5fb3c18cbc5a',
}

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
