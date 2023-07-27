import React from 'react'
import BookDetailsPage from '@/page-components/BookDetailsPage'
const page = ({params}) => {
  return (
    <div>
        <BookDetailsPage id={params.BookId}/>
    </div>
  )
}

export default page