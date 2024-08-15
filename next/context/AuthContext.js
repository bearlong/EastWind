// 用於建立一個React Context來管理用戶的身份驗證狀態。
import { createContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import jwt from 'jsonwebtoken'

// 創建一個AuthContext，用於提供用戶身份驗證狀態的全局存取
export const AuthContext = createContext(null)

// 創建AuthProvider組件，負責管理和提供用戶的身份驗證狀態
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(undefined)
  const [user, setUser] = useState(undefined)

  const router = useRouter()
  const loginRoute = '/login' // 定義登入路由的URL
  const protectedRoutes = ['/']

  useEffect(() => {
    if (!user) {
      // 用戶未登入
      if (protectedRoutes.includes(router.pathname)) {
        // 當前路由在受保護路由中
        router.push(loginRoute)
      }
    } else {
      // 用戶已登入
      if (router.pathname === loginRoute) {
        router.push('/home') // 如果已登入且當前路徑是登入頁面，重定向到首頁
      }
    }
  }, [router.isReady, router.pathname, user])

  // 當token變化時，驗證token並更新用戶狀態
  useEffect(() => {
    ;(async () => {
      if (token) {
        // 如果存在token
        let result = await checkToken(token) // 驗證token並獲取解碼後的用戶信息

        if (result && result.account) {
          // 如果解碼後有用戶帳號
          setUser(result) // 設置用戶狀態
        } else {
          setToken(undefined) // 否則設置token為undefined
          setToken(undefined) // 否則設置用戶狀態為undefined
        }
      }
    })()
  }, [token]) // 當token變化時觸發

  // 在組件掛載時，嘗試從本地存儲中獲取舊的token並檢查其有效性
  useEffect(() => {
    const oldToken = localStorage.getItem('nextXXXToken') // 從本地存儲中獲取舊的token
    // 輸出舊的token到控制台
    ;(async () => {
      if (oldToken) {
        // 如果存在舊的token
        let newToken, error // 定義新的token和錯誤變數
        const url = 'http://localhost:3005/api/user/status' // 定義API請求的URL
        newToken = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${oldToken}`, // 在請求頭部中加入Authorization字段，攜帶舊的token
          },
        })
          .then((res) => res.json()) // 將響應轉換為JSON格式
          .then((result) => {
            if (result.status === 'success') {
              // 如果響應狀態為success
              return result.token // 返回新的token
            } else {
              throw new Error(result.message) // 否則拋出錯誤
            }
          })
          .catch((err) => {
            error = err // 捕獲錯誤並存入error變數
            return undefined // 返回undefined
          })

        if (error) {
          // 如果發生錯誤
          console.error('Error refreshing token:', error.message)
          return // 結束函數執行
        }
        if (newToken) {
          // 如果獲取到新的token
          setToken(newToken) // 更新token狀態
          localStorage.setItem('nextXXXToken', newToken) // 將新的token存入本地存儲
        }
      }
    })()
  }, []) // 這個useEffect只在組件第一次渲染時執行

  // 確認 JWT token 是否有效
  const checkToken = async (token) => {
    const secretKey = 'boyuboyuboyuIamBoyu'
    let decoded

    try {
      decoded = await new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (error, data) => {
          if (error) {
            console.error('Token verification failed:', error)
            // 確保拋出的錯誤是一個 Error 物件
            return reject(new Error('Token verification failed'))
          }
          resolve(data)
        })
      })

      // 如果 token 驗證成功，使用 decoded 中的 user ID 撈取用戶資料
      if (decoded && decoded.id) {
        const response = await fetch(
          `http://localhost:3005/api/user/user/${decoded.id}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        const result = await response.json()

        if (result.status === 'success') {
          // 返回撈取到的用戶資料
          return result.data
        } else {
          console.error('Failed to fetch user data:', result.message)
          return null
        }
      }
    } catch (err) {
      console.error('Token verification error:', err.message)
      decoded = null // 如果驗證失敗，將 decoded 設為 null
    }

    console.log('Decoded token:', decoded)
    return decoded // 返回解碼後的數據
  }

  // 將用戶、token狀態和相關操作作為Context提供給應用的其他部分
  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken }}>
      {children} {/* 包裝應用的子組件 */}
    </AuthContext.Provider>
  )
}
