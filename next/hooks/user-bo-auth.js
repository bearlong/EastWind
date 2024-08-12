// 用於創建自定義的`useAuth`鉤子，處理用戶的登入與登出功能。
// 該鉤子利用`AuthContext`來管理和更新應用中的身份驗證狀態，包括token和user信息。
import { useContext } from 'react'
import { AuthContext } from '@/context/AuthContext'

// 創建useAuth自定義鉤子
const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth 必須在 AuthProvider 內使用')
  }

  const { setUser, token, setToken } = useContext(AuthContext)

  // 登入功能
  const login = async (account, password) => {
    let newToken, error // 定義變數，用於存儲新的token和錯誤信息
    const url = 'http://localhost:3005/api/user/login' // 定義登入API的URL
    const formData = new FormData() // 創建FormData對象，用於存儲登入表單數據
    formData.append('account', account) // 將帳號添加到FormData中
    formData.append('password', password) // 將密碼添加到FormData中

    // 發送POST請求以進行登入
    newToken = await fetch(url, {
      method: 'POST',
      body: formData, // 設置請求體為formData
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`)
        }
        return res.json()
      })
      .then((result) => {
        if (result.status === 'success') {
          // 如果登入成功
          return result.token // 返回新的token
        } else {
          throw new Error(result.message) // 否則拋出錯誤
        }
      })
      .catch((err) => {
        console.log(error)
        error = err // 捕獲錯誤並存儲在error變數中
        return undefined // 返回undefined
      })

    if (error) {
      // 如果發生錯誤
      alert(`Login failed: ${error.message}`) // 顯示錯誤訊息
      console.error('Login error:', error)
      return
    }

    if (newToken) {
      // 如果獲取到新的token
      setToken(newToken) // 更新上下文中的token狀態
      localStorage.setItem('nextXXXToken', newToken) // 將新的token存入本地存儲
    }
  }

  // 登出功能
  const logout = async () => {
    let newToken, error // 定義變數，用於存儲新的token和錯誤信息
    const url = 'http://localhost:3005/api/user/logout' // 定義登入API的URL

    // 發送GET請求以進行登入
    newToken = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`, // 在請求頭部中添加Authorization字段，攜帶當前的token
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status === 'success') {
          // 如果登出成功
          return result.token // 返回新的token（應該是已過期的token）
        } else {
          throw new Error(result.message) // 否則拋出錯誤
        }
      })
      .catch((err) => {
        error = err // 捕獲錯誤並存儲在error變數中
        return undefined // 返回undefined
      })

    if (error) {
      // 如果發生錯誤
      alert(error.message) // 顯示錯誤訊息
      console.error('Logout error:', error)
      return
    }

    if (newToken) {
      // 如果獲取到新的token
      setToken(newToken) // 更新上下文中的token狀態
      localStorage.setItem('nextXXXToken', newToken) // 將新的token存入本地存儲
    }
  }
  // 返回login和logout函數，供組件調用
  return { login, logout }
}

export default useAuth // 將useAuth鉤子導出
