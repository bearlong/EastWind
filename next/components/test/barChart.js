import React from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

// 註冊 Chart.js 的模組
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const BarChart = () => {
  const data = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    datasets: [
      {
        label: 'People',
        data: [300, 200, 500, 400, 600, 700, 300, 200, 500, 200, 900, 100],
        backgroundColor: '#b79347',
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
            size: 14, // 調整圖例文字的字體大小
          },
        },
      },
      title: {
        display: true,
        text: 'Monthly Registrations',
        font: {
          size: 18, // 調整標題文字的字體大小
        },
      },
      tooltip: {
        bodyFont: {
          size: 16, // 調整工具提示文字的字體大小
        },
        titleFont: {
          size: 16, // 調整工具提示標題的字體大小
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 16, // 調整 X 軸標籤的字體大小
          },
        },
      },
      y: {
        ticks: {
          font: {
            size: 16, // 調整 Y 軸標籤的字體大小
          },
        },
      },
    },
  }
  return <Bar data={data} options={options} />
}

export default BarChart
