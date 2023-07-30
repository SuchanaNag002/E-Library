"use client"
import React from 'react'
import { UserAuth } from '@/context/authContext'


const BookAndCartButton = (props) => {
  const book = props.details;
  const [userDetails,setUserDetails] = UserAuth();
  function addToCart(){
    apiCaller.addToCart(userDetails.email,book._id).then((data)=>{
      if(data && data.success){
        setUserDetails(data.value);
      }
    })
  }
  return (
    <div>
        <button
              className="cart__remove_button"
              onClick={addToCart}
            >
              -
        </button>
    </div>
  )
}

export default BookAndCartButton