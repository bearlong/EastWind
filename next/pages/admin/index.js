import { useContext, useEffect, useState } from 'react'
import styles from '@/styles/boyu/user-info.module.scss'
import AdminCenterLayout from '@/components/layout/admin-layout'
import { useRouter } from 'next/router'
import { AuthContext } from '@/context/AuthContext'

export default function Admin() {
  const router = useRouter()
  const { user, loading } = useContext(AuthContext)

  useEffect(() => {
    if (router.isReady && !loading) {
      if (user.id !== 62 || (!user && loading === false)) {
        alert('請由正常管道進入')
        router.push('/home')
      }
    }
  }, [router.isReady, user])
  // 確認window(瀏覽器)開始運作
  if (typeof window !== 'undefined') {
    router.push('/admin/chart')
  }
  return <></>
}
Admin.getLayout = function (page) {
  return <AdminCenterLayout>{page}</AdminCenterLayout>
}
