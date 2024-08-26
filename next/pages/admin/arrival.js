import React, { useState, useEffect } from 'react'
import AdminCenterLayout from '@/components/layout/admin-layout'
import styles from '@/styles/bearlong/arrival.module.scss'

export default function Arrival() {
  const [data, setData] = useState([{}])

  const getData = async () => {
    try {
      const url = `http://localhost:3005/api/chart`
      const response = await fetch(url)
      const result = await response.json()
      if (result.status === 'success') {
        const { message, ...data } = result.data
        setData(data)
        console.log(data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <>
      <div className={styles['main']}>
        <div className={styles['menber-info-box-bo']}>
          <table
            className={`${styles['table-bl']} table  table-striped table-bordered p `}
          >
            <thead className="text-center">
              <tr>
                <th>流水編號</th>
                <th>出貨方式</th>
                <th>訂單日期</th>
                <th>出貨</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2023-05-01 12:00</td>
                <td>Bearlong</td>
                <td>大��</td>
                <td className="text-center">
                  <label htmlFor="arrival">
                    <input name="arrival" id="arrival" type="checkbox" />
                    確認出貨
                  </label>
                </td>
              </tr>
              <tr>
                <td>2023-05-02 15:00</td>
                <td>Eric</td>
                <td>香港</td>
                <td className="text-center">
                  <label htmlFor="arrival2">
                    <input name="arrival" id="arrival2" type="checkbox" />
                    確認出貨
                  </label>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

Arrival.getLayout = function (page) {
  return <AdminCenterLayout>{page}</AdminCenterLayout>
}
