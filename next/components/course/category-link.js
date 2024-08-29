import React from 'react'
import Link from 'next/link'

const CategoryLink = ({ courses, categoryId }) => {
  const course = Array.isArray(courses)
    ? courses.find((c) => c.category_id === categoryId)
    : courses

  return (
    <Link href={`/course/classListCate/${categoryId}`}>
      <span> {course?.ch_name || '載入中...'} </span>
    </Link>
  )
}

export default CategoryLink
