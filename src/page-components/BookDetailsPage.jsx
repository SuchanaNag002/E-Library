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
    <div className='book__details'>
      <div className='book__details__image-container'>
        <img src={BookDetails.coverLink} alt='' className='book_details__image' />
      </div>
      <div className='book__details__content'>
        <div className='book__details__title'>{BookDetails.name}</div>
        <div className='book__details__id'><b className='font-bold'>ISBN : </b> {BookDetails._id}</div>
        <div className='book__details__author'><b className='font-bold'>Author :</b> {BookDetails.author} </div>
        <div className='book__details__description'>{BookDetails.description}</div>
      </div>
    </div>
  )
}

export default BookDetailsPage
