import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/aa/classList.scss'
import Footer from '@/components/layout/default-layout/footer'

export default function ClassList() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      setLoading(true)
      const response = await axios.get(
        'http://localhost:3005/api/classListTest816'
      )
      setCourses(response.data)
      setLoading(false)
    } catch (err) {
      setError('載入課程資料失敗')
      setLoading(false)
    }
  }

  if (loading) return <div>載入中...</div>
  if (error) return <div>{error}</div>

  return (
    <>
      <div className="container">
        <div className="desktop-list-aa">
          <div className="sec1-aa">
            <div className="texth2-aa">
              <h2>所有課程列表</h2>
            </div>
            <div className="classCards-aa">
              {courses.map((course) => (
                <div key={course.id} className="classCard-aa">
                  <div className="imgBox-aa">
                    <img src={course.images} alt={course.course_name} />
                  </div>
                  <div className="cardBody-aa">
                    <div className="className-aa">
                      <p>{course.course_name}</p>
                      <p className="classDescription-aa">{course.content}</p>
                    </div>
                    <p>NT. {course.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}
