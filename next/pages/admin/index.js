import { useContext, useEffect, useState } from 'react'
import styles from '@/styles/boyu/user-info.module.scss'
import AdminCenterLayout from '@/components/layout/admin-layout'

export default function Admin() {
  return (
    <>
      <div className={`${styles['user-info-box-bo']} w-100 main`}>
        <h1>Admin</h1>
        <p>This is the admin dashboard.</p>
      </div>
      <style jsx>
        {`
          .main {
            height: 200vh;
          }
        `}
      </style>
    </>
  )
}
Admin.getLayout = function (page) {
  return <AdminCenterLayout>{page}</AdminCenterLayout>
}
