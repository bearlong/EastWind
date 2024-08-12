import React from 'react'
import styles from '@/styles/boyu/user-info-edit.module.scss'
import { FaEdit } from 'react-icons/fa'
import { FaXmark } from 'react-icons/fa6'

export default function UserEditButtons() {
  return (
    <div
      className={`${styles['info-btn-box-bo']} d-flex justify-content-center align-items-center gap-5`}
    >
      <button
        className={`${styles['btn-edit-info-bo']} btn h6 d-flex justify-content-center align-items-center gap-2 gap-sm-3`}
      >
        取消修改
        <FaXmark />
      </button>
      <button
        className={`${styles['btn-edit-info-bo']} btn h6 d-flex justify-content-center align-items-center gap-2 gap-sm-3`}
      >
        修改資訊
        <FaEdit />
      </button>
    </div>
  )
}
