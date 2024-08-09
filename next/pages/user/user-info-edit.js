import UserSidebar from '@/components/user/user-sidebar'
import styles from '@/styles/boyu/user-info-edit.module.scss'
import UserEditBasicInfo from '@/components/user/user-edit-basic-info'
import UserEditDetailInfo from '@/components/user/user-edit-detail-info'
import UserEditButtons from '@/components/user/user-edit-buttons'

export default function UserInfoEdit() {
  return (
    <>
      <section className="d-flex flex-column flex-md-row">
        <UserSidebar />
        <div className={`${styles['user-info-box-bo']}  w-100`}>
          <div className={`${styles['info-form-box-bo']} flex-column d-flex`}>
            <UserEditBasicInfo />
            <UserEditDetailInfo />
            <UserEditButtons />
          </div>
        </div>
      </section>
    </>
  )
}
