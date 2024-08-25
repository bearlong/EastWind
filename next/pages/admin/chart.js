import React from 'react'
import BarChartRegistration from '@/components/test/barChartRegistration'
import BarChartOrder from '@/components/test/barChartOrder'
import BarChartPatry from '@/components/test/barChartParty'
import BarChartBooking from '@/components/test/barChartBooking'
import PieChartGender from '@/components/test/pieChartGender'
import PieChartAge from '@/components/test/pieChartAge'
import PieChartPbCate from '@/components/test/pieCharPbCate'
import PieChartComplete from '@/components/test/pieCharComplete'
import PieChartArea from '@/components/test/pieChartArea'
import LineChartIncome from '@/components/test/lineChartIncome'
import AdminCenterLayout from '@/components/layout/admin-layout'
import styles from '@/styles/bearlong/chart.module.scss'

export default function Chart() {
  return (
    <>
      <div className={styles['main']}>
        <div className={styles['menber-info-box-bo']}>
          <h3 className="m-4">會員結構</h3>
          <div
            className={`${styles.chartBox} d-flex justify-content-center align-items-center flex-column mb-3`}
          >
            <h5>每月註冊</h5>
            <BarChartRegistration />
          </div>
          <div
            className={`${styles.chartBox} d-flex justify-content-around align-items-center mb-5`}
          >
            <div className="d-flex justify-content-center align-items-center flex-column">
              <h5>男女比</h5>
              <PieChartGender />
            </div>
            <div className="d-flex justify-content-center align-items-center flex-column">
              <h5>年齡分布</h5>
              <PieChartAge />
            </div>
          </div>
          <h3 className="m-4">商品銷售</h3>
          <div
            className={`${styles.chartBox} d-flex justify-content-around align-items-center mb-3`}
          >
            <div className="d-flex justify-content-center align-items-center flex-column">
              <h5>營收占比</h5>
              <PieChartPbCate />
            </div>
            <div className="d-flex justify-content-start align-items-start flex-column">
              <h3>累積銷售</h3>
              <h3>NT: 1,521,555</h3>
            </div>
          </div>
          <div
            className={`${styles.chartBox} d-flex justify-content-center align-items-center flex-column mb-3`}
          >
            <h5>訂單數量</h5>
            <BarChartOrder />
          </div>
          <div
            className={`${styles.chartBox} d-flex justify-content-center align-items-center flex-column mb-5`}
          >
            <h5>每月營收</h5>
            <LineChartIncome />
          </div>
          <h3 className="m-4">棋牌室</h3>
          <div
            className={`${styles.chartBox} d-flex justify-content-center align-items-center flex-column mb-3`}
          >
            <h5>每月訂桌數</h5>
            <BarChartBooking />
          </div>
          <div
            className={`${styles.chartBox} d-flex justify-content-center align-items-center flex-column mb-3`}
          >
            <h5>每月成團數</h5>
            <BarChartPatry />
          </div>
          <div
            className={`${styles.chartBox} d-flex justify-content-around align-items-center mb-3`}
          >
            <div className="d-flex justify-content-center align-items-center flex-column">
              <h5>成團率</h5>
              <PieChartComplete />
            </div>
            <div className="d-flex justify-content-center align-items-center flex-column">
              <h5>地區分布</h5>
              <PieChartArea />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

Chart.getLayout = function (page) {
  return <AdminCenterLayout>{page}</AdminCenterLayout>
}
