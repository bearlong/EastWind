import styles from '@/styles/boyu/user-info.module.scss'

import UserSidebar from '../../components/user/user-sidebar'
import UserBasicInfo from '@/components/user/user-basic-info'
import UserDetailInfo from '@/components/user/user-detail-info'
import UserInfoButton from '@/components/user/user-info-button'

export default function UserInfo() {
  return (
    <section className="d-flex flex-column flex-md-row">
      <UserSidebar />
      <div className={`${styles['user-info-box-bo']} w-100`}>
        <div className={`${styles['info-form-box-bo']} flex-column d-flex`}>
          <UserBasicInfo />
          <UserDetailInfo />
          <UserInfoButton />
        </div>
      </div>
    </section>
  )
}
