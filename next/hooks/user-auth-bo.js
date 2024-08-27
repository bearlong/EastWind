import { useContext } from 'react'
import { useRouter } from 'next/router'
import { AuthContext } from '@/context/AuthContext'
import useFirebase from './use-firebase-bo'

const useAuth = () => {
  const { setUser, token, setToken } = useContext(AuthContext)
  const router = useRouter()
  const { loginGoogle, loginGoogleRedirect, logoutFirebase, initApp } =
    useFirebase()

  if (!useContext) {
    throw new Error('useAuth 必須在 AuthProvider 內使用')
  }

  // 集中處理 localStorage 操作
  const setLocalStorageTokens = (accessToken, refreshToken) => {
    localStorage.setItem('accessToken', accessToken)
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken)
    }
  }

  const clearLocalStorageTokens = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
  }

  const login = async (account, password) => {
    // 如果你需要本地帳號和密碼的登入邏輯，保留這部分
    const url = 'http://localhost:3005/api/user/login'
    const data = { account, password }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (result.status === 'success') {
        const newAccessToken = result.accessToken
        const newRefreshToken = result.refreshToken

        setToken(newAccessToken)
        setLocalStorageTokens(newAccessToken, newRefreshToken)
        return { success: true, token: newAccessToken, name: result.name }
      } else {
        return { success: false, message: result.message }
      }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, message: '無法連接伺服器，請稍後再試' }
    }
  }

  const loginWithGoogle = async () => {
    // 使用 Firebase 的 Google 登入
    loginGoogle(async (user) => {
      // 登入成功後，將使用者資訊傳送到你的後端
      const response = await fetch('http://localhost:3005/api/google-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      })

      const result = await response.json()

      if (result.status === 'success') {
        const newAccessToken = result.data.accessToken
        setToken(newAccessToken)
        setLocalStorageTokens(newAccessToken)
        setUser(user)
      } else {
        console.error('Failed to log in with Google:', result.message)
      }
    })
  }

  const logout = async () => {
    const url = 'http://localhost:3005/api/user/logout'

    try {
      await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      // 同步登出 Firebase
      await logoutFirebase()

      // 清除 token 和 user 狀態
      setToken(undefined)
      setUser(undefined)

      clearLocalStorageTokens()
      router.push('/home')
    } catch (error) {
      console.error('Logout error:', error)
      alert('登出失敗，請稍後再試')
    }
  }

  const refreshToken = async () => {
    const storedRefreshToken = localStorage.getItem('refreshToken')
    if (!storedRefreshToken) return
    try {
      const response = await fetch('http://localhost:3005/api/refresh-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: storedRefreshToken }),
      })

      const result = await response.json()
      if (result.status === 'success') {
        const newAccessToken = result.accessToken
        setToken(newAccessToken)
        localStorage.setItem('accessToken', newAccessToken)
      } else {
        console.error('Failed to refresh access token:', result.message)
        logout()
      }
    } catch (error) {
      console.error('Refresh token error:', error)
      logout()
    }
  }

  return {
    login,
    logout,
    refreshToken,
    loginWithGoogle, // 新增的 Google 登入
  }
}

export default useAuth
