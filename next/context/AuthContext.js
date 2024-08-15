import { createContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import jwt from 'jsonwebtoken'

// 創建 AuthContext，用於在應用中提供全局的身份驗證狀態
export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  // 狀態管理：token 和 user 信息
  const [token, setToken] = useState(undefined)
  const [user, setUser] = useState(undefined)

  const router = useRouter()
  const loginRoute = '/login' // 登入頁面的路徑
  const protectedRoutes = ['/'] // 需要身份驗證的受保護路徑

  // 監聽路由變化，確保未登入的用戶不能訪問受保護的路徑
  useEffect(() => {
    if (!user && protectedRoutes.includes(router.pathname)) {
      router.push(loginRoute) // 如果用戶未登入，且試圖訪問受保護路徑，重定向到登入頁面
    } else if (user && router.pathname === loginRoute) {
      router.push('/home') // 如果用戶已登入但在登入頁面，重定向到首頁
    }
  }, [router.isReady, router.pathname, user])

  // 初始化身份驗證狀態，檢查舊的 accessToken 和 refreshToken
  useEffect(() => {
    const initializeAuth = async () => {
      const oldToken = localStorage.getItem('accessToken') // 從 localStorage 中獲取舊的 accessToken
      const refreshToken = localStorage.getItem('refreshToken') // 從 localStorage 中獲取 refreshToken

      if (oldToken) {
        const user = await checkToken(oldToken) // 驗證舊的 accessToken
        if (user) {
          setUser(user) // 設置用戶狀態
          setToken(oldToken) // 設置 token 狀態
        } else if (refreshToken) {
          const newAccessToken = await refreshAccessToken(refreshToken) // 使用 refreshToken 獲取新的 accessToken
          if (newAccessToken) {
            setToken(newAccessToken) // 更新 token 狀態
            localStorage.setItem('accessToken', newAccessToken) // 存儲新的 accessToken 到 localStorage
          } else {
            localStorage.removeItem('accessToken') // 刪除無效的 accessToken
            localStorage.removeItem('refreshToken') // 刪除無效的 refreshToken
            router.push(loginRoute) // 重定向到登入頁面
          }
        } else {
          localStorage.removeItem('accessToken') // 如果沒有 refreshToken，刪除舊的 accessToken
          router.push(loginRoute) // 重定向到登入頁面
        }
      }
    }

    initializeAuth() // 初始化身份驗證狀態
  }, [])

  // 當 token 改變時觸發，驗證並設置用戶狀態
  useEffect(() => {
    if (token) {
      const verifyAndSetUser = async () => {
        const result = await checkToken(token) // 驗證當前的 token
        if (result && result.account) {
          setUser(result) // 設置用戶狀態
        } else {
          setToken(undefined) // 如果 token 無效，清除 token 狀態
          localStorage.removeItem('accessToken') // 刪除無效的 accessToken
          router.push(loginRoute) // 重定向到登入頁面
        }
      }

      verifyAndSetUser() // 驗證並設置用戶狀態
    }
  }, [token])

  // 函數：檢查並驗證 token 的有效性
  const checkToken = async (token) => {
    const secretKey = 'boyuboyuboyuIamBoyu'
    try {
      const decoded = jwt.verify(token, secretKey) // 解碼並驗證 token
      if (decoded && decoded.id) {
        const response = await fetch(
          `http://localhost:3005/api/user/user/${decoded.id}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`, // 在請求頭部附帶 token
            },
          }
        )
        const result = await response.json()
        return result.status === 'success' ? result.data : null // 返回用戶資料或 null
      }
    } catch (err) {
      console.error('Token verification error:', err.message) // 打印驗證錯誤
      return null
    }
  }

  // 函數：使用 refreshToken 來獲取新的 accessToken
  const refreshAccessToken = async (refreshToken) => {
    try {
      const response = await fetch(
        'http://localhost:3005/api/user/refresh-token',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refreshToken }), // 將 refreshToken 作為請求體發送
        }
      )
      const result = await response.json()
      return result.status === 'success' ? result.accessToken : null // 返回新的 accessToken 或 null
    } catch (error) {
      console.error('Failed to refresh access token:', error) // 打印刷新 token 失敗的錯誤
      return null
    }
  }

  // 返回 AuthContext.Provider，提供 user、setUser、token 和 setToken 的上下文
  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken }}>
      {children} {/* 將子組件包裝在 Provider 中 */}
    </AuthContext.Provider>
  )
}
