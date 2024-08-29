import React from 'react'
import Link from 'next/link'

const CategoryLink = ({ courses, course_category_id }) => {
  const course = Array.isArray(courses)
    ? courses.find((c) => c.course_category_id === course_category_id)
    : courses

  return (
    <Link href={`/course/classListCate/${course_category_id}`}>
      <span> {course.course_category_id} </span>
    </Link>
  )
}

export default CategoryLink
