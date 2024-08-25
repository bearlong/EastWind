import React from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

// 註冊 Chart.js 的模組
ChartJS.register(ArcElement, Tooltip, Legend)

const PieChartArea = () => {
  const data = {
    labels: ['北區', '中區', '南區'],
    datasets: [
      {
        label: 'area',
        data: [245, 159, 95],
        backgroundColor: ['#2b4d37', '#1e8148', '#55c57a'],
        borderColor: ['#2b4d37', '#1e8148', '#55c57a'],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 20, // 調整圖例文字的字體大小
          },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
  }

  return <Pie data={data} options={options} />
}

export default PieChartArea
