import React from 'react'
import styles from '@/styles/boyu/user-info.module.scss'
import { FaEdit } from 'react-icons/fa'
import Link from 'next/link'

export default function UserInfoButton() {
  return (
    <div
      className={`${styles['info-btn-box-bo']} d-flex justify-content-center align-items-center`}
    >
      <button className={`${styles['btn-edit-info-bo']} btn h6 `}>
        <Link
          className={`${styles['link']} d-flex justify-content-center align-items-center  gap-5`}
          href="http://localhost:3000/user/user-info-edit"
        >
          修改資訊
          <FaEdit />
        </Link>
      </button>
    </div>
  )
}
