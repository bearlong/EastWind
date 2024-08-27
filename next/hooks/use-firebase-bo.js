import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  onAuthStateChanged,
} from 'firebase/auth'
import { useEffect } from 'react'
import { firebaseConfig } from './firebase-config'

// 初始化 Firebase
const useFirebase = () => {
  useEffect(() => {
    initializeApp(firebaseConfig)
  }, [])

  // 使用 Google 進行彈窗登入
  const loginGoogle = async (callback) => {
    const provider = new GoogleAuthProvider()
    const auth = getAuth()

    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      console.log(user)

      // 在此處調用回調函數並將用戶資料傳遞回去
      if (callback) {
        callback(user.providerData[0])
      }
    } catch (error) {
      console.log('Google Sign-In Error:', error)

      if (error.code === 'auth/popup-blocked') {
        alert('彈窗被阻止，請允許瀏覽器彈窗以完成登入。')
      } else {
        alert('發生錯誤，請稍後再試。')
      }
    }
  }

  // 登出功能
  const logoutFirebase = () => {
    const auth = getAuth()

    signOut(auth)
      .then(() => {
        console.log('已成功登出。')
      })
      .catch((error) => {
        console.log('登出錯誤：', error)
      })
  }

  return {
    loginGoogle,
    logoutFirebase,
  }
}

export default useFirebase
