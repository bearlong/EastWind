import React from 'react'
import Link from 'next/link'
import styles from '@/styles/aa/classDetail.module.scss'

const CategoryLink = ({ courses, course_category_id }) => {
  const course = Array.isArray(courses)
    ? courses.find((c) => c.course_category_id === course_category_id)
    : courses

  return (
    <Link
      className={styles['card-link-n']}
      // href={`/course/classListCate?category_id=1`}
      href={`/course/classListCate?category_id=1`}
    >
      {/* <span> {course.course_category_id} </span> */}
      <span> 麻將 </span>
    </Link>
  )
}

export default CategoryLink
