import { useContext } from 'react'
import { useRouter } from 'next/router'
import { AuthContext } from '@/context/AuthContext'

const useAuth = () => {
  const context = useContext(AuthContext)
  const router = useRouter()

  if (!context) {
    throw new Error('useAuth 必須在 AuthProvider 內使用')
  }

  const { setUser, token, setToken } = useContext(AuthContext)

  // 集中處理 localStorage 操作
  // 用於存儲 accessToken 和 refreshToken 到 localStorage
  const setLocalStorageTokens = (accessToken, refreshToken) => {
    localStorage.setItem('accessToken', accessToken)
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken)
    }
  }

  // 用於清除 localStorage 中的 accessToken 和 refreshToken
  const clearLocalStorageTokens = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
  }

  // 登入功能
  // 將用戶憑證發送到伺服器以進行驗證並獲取 JWT token
  const login = async (account, password) => {
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
        setLocalStorageTokens(newAccessToken, newRefreshToken) // 存儲 accessToken 和 refreshToken
        return { success: true, token: newAccessToken, name: result.name }
      } else {
        return { success: false, message: result.message }
      }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, message: '無法連接伺服器，請稍後再試' }
    }
  }

  // 登出功能
  // 讓伺服器使當前 token 無效，並清除客戶端上的 token
  const logout = async () => {
    const url = 'http://localhost:3005/api/user/logout'

    try {
      await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      // 清除 token 和 user 狀態
      setToken(undefined)
      setUser(undefined)

      // 清除本地存儲中的 token
      clearLocalStorageTokens()

      // 跳轉回首頁
      router.push('/home')
    } catch (error) {
      console.error('Logout error:', error)
      alert('登出失敗，請稍後再試')
    }
  }

  // 自動刷新 Token
  // 使用 refreshToken 獲取新的 accessToken，並更新本地存儲
  const refreshToken = async () => {
    const storedRefreshToken = localStorage.getItem('refreshToken')
    if (!storedRefreshToken) return

    try {
      const response = await fetch('http://localhost:3005/api/refresh-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken: storedRefreshToken }),
      })

      const result = await response.json()
      if (result.status === 'success') {
        const newAccessToken = result.accessToken
        setToken(newAccessToken)
        localStorage.setItem('accessToken', newAccessToken) // 更新 accessToken
      } else {
        console.error('Failed to refresh access token:', result.message)
        logout() // 如果刷新失敗，登出用戶
      }
    } catch (error) {
      console.error('Refresh token error:', error)
      logout() // 如果刷新失敗，登出用戶
    }
  }

  // 返回 login、logout 和 refreshToken 函數，供組件調用
  return { login, logout, refreshToken }
}

export default useAuth
