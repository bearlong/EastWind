import React from 'react'
import BarChart from '@/components/test/barChart'
import PieChart from '@/components/test/pieChart'
import AdminCenterLayout from '@/components/layout/admin-layout'
import styles from '@/styles/bearlong/chart.module.scss'

export default function Chart() {
  return (
    <>
      <div className={styles['main']}>
        <div className={styles['menber-info-box-bo']}>
          <h3 className="m-4 d-inline-block align-self-start">會員結構</h3>
          <div className={`${styles.chartBox}`}>
            <h5>每月註冊</h5>
            <BarChart />
            <PieChart />
          </div>
        </div>
      </div>
    </>
  )
}

Chart.getLayout = function (page) {
  return <AdminCenterLayout>{page}</AdminCenterLayout>
}
