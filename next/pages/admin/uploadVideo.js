import React from 'react'
import BarChart from '@/components/test/barChart'
import AdminCenterLayout from '@/components/layout/admin-layout'

export default function Chart() {
  return (
    <>
      <div className="App">
        <h1>My Sales Data</h1>
        <BarChart />
      </div>
    </>
  )
}

Chart.getLayout = function (page) {
  return <AdminCenterLayout>{page}</AdminCenterLayout>
}
