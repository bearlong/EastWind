import useFirebase from '@/hooks/use-firebase-bo'
import useAuth from '@/hooks/user-auth-bo'
import GoogleLogo from '@/components/icons/google-logo'

export default function Glogin() {
  const { loginGoogle } = useFirebase()
  const { user, loading } = useAuth()

  // 處理google登入後，要向伺服器進行登入動作
  const callbackGoogleLoginPopup = async (providerData) => {
    console.log(providerData)
  }

  return (
    <div>
      {loading ? (
        <p>正在載入...</p>
      ) : (
        <p>會員狀態: {user ? '已登入' : '未登入'}</p>
      )}
      <button onClick={() => loginGoogle(callbackGoogleLoginPopup)}>
        <GoogleLogo /> Google登入
      </button>
    </div>
  )
}
