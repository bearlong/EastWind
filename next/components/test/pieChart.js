import React from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

// 註冊 Chart.js 的模組
ChartJS.register(ArcElement, Tooltip, Legend)

const PieChart = () => {
  const data = {
    labels: ['男', '女'],
    datasets: [
      {
        label: 'people',
        data: [85, 19],
        backgroundColor: ['rgba(54, 162, 235, 0.5)', 'rgba(255, 99, 132, 0.5)'],
        borderColor: ['rgba(54, 162, 235, 0.5)', 'rgba(255, 99, 132, 0.5)'],
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

export default PieChart
