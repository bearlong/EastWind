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
  const protectedRoute = ['/']

  // 加入調試輸出來確認狀態變化

  useEffect(() => {
    console.log('AuthProvider mounted or token changed')
    console.log('Current Token:', token)
    console.log('Current User:', user)
  }, [token, user])

  // 當路由變化時，檢查用戶是否已登入，若未登入且在受保護路由，則重定向至登入頁面
  useEffect(() => {
    if (!user) {
      // 如果用戶未登入
      if (protectedRoute.includes(router.pathname)) {
        // 如果當前路由在受保護路由中
        console.log('User not authenticated, redirecting to login')
        router.push(loginRoute) // 如果已登入，重定向到首頁
      }
    } else {
      console.log('User authenticated, redirecting to home')
      router.push('/') // 如果已登入，重定向到首頁
    }
  }, [router.isReady, router.pathname, user]) // 當路由準備就緒、路徑名或用戶狀態變化時觸發

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
          console.log('Invalid token, setting token to undefined')
          setToken(undefined) // 否則設置用戶狀態為undefined
        }
      }
    })()
  }, [token]) // 當token變化時觸發

  // 在組件掛載時，嘗試從本地存儲中獲取舊的token並檢查其有效性
  useEffect(() => {
    const oldToken = localStorage.getItem('nextXXXToken') // 從本地存儲中獲取舊的token
    console.log(oldToken)
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
              console.log('Token refreshed:', result.token)
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
          alert(error.message) // 顯示錯誤訊息
          return // 結束函數執行
        }
        if (newToken) {
          // 如果獲取到新的token
          setToken(newToken) // 更新token狀態
          localStorage.setItem('nextXXXToken', newToken) // 將新的token存入本地存儲
        }
      } else {
        console.log('No token found in localStorage')
      }
    })()
  }, []) // 這個useEffect只在組件第一次渲染時執行

  // 確認 JWT token是否有效
  const checkToken = async (token) => {
    const secretKey = 'XXX' // 設置JWT的秘鑰
    let decoded // 定義解碼後的數據變數
    try {
      decoded = await new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (error, data) => {
          // 使用秘鑰驗證token
          if (error) {
            console.error('Token verification failed:', error.message)
            return reject(error) // 如果驗證失敗，拒絕Promise
          }
          resolve(data) // 如果驗證成功，解析數據並解決Promise
        })
      })
    } catch (err) {
      console.error('Token verification error:', err.message)
      decoded = null // 如果驗證失敗，將 decoded 設為 null
    }
    return decoded // 返回解碼後的數據
  }

  // 將用戶、token狀態和相關操作作為Context提供給應用的其他部分
  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken }}>
      {children} {/* 包裝應用的子組件 */}
    </AuthContext.Provider>
  )
}
