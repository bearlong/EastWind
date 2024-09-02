import React from 'react'
import Link from 'next/link'
import styles from '@/styles/aa/classDetail.module.scss'

const CategoryLink = ({ courses = {} }) => {
  // const course = Array.isArray(courses)
  //   ? courses.find((c) => c.category_id === category_id)
  //   : courses

  return (
    <Link
      className={styles['card-link-n']}
      href={`/course/classListCate?category_id=1`}
      // href={`/course/classListCate?category_id=${course.category_id}`}
    >
      {/* <span> {courses.ch_name} </span> */}
      <span> 麻將 </span>
    </Link>
  )
}

export default CategoryLink
