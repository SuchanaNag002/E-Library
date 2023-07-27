"use client"
import React, { useEffect, useState } from 'react'
import apiCaller from '@/api/apiCaller'
import "@/styles/bookDetails.css";

const BookDetailsPage = (props) => {
  const [BookDetails,setBookDetails] = useState(null);
  useEffect(()=>{
    apiCaller.searchByID(props.id).then((result) =>{setBookDetails(result);  console.log(result);});
  },[]);
  if (!BookDetails){
    return null;
  }
  return (
    <div className='book_details'>
      <div className='book_details__image-container'>
        <img src={BookDetails.coverLink} alt='' className='book_details__image' />
      </div>
    </div>
  )
}

export default BookDetailsPage