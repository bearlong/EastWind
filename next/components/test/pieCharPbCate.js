import React from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

// 註冊 Chart.js 的模組
ChartJS.register(ArcElement, Tooltip, Legend)

const PieChartPbCate = () => {
  const data = {
    labels: ['麻將牌', '牌尺', '麻將桌', '周邊', '桌遊'],
    datasets: [
      {
        label: 'people',
        data: [85, 19, 30, 10, 105],
        backgroundColor: [
          '#2b4d37',
          '#1e8148',
          '#55c57a',
          '#b1d8be',
          '#16221b',
        ],
        borderColor: ['#2b4d37', '#1e8148', '#55c57a', '#b1d8be', '#16221b'],
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

export default PieChartPbCate
