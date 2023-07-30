"use client"
import React, { useEffect, useState } from 'react'
import { UserAuth } from '@/context/authContext'
import "@/styles/CartAndMybooks/CartAndMyBooks.css"
import apiCaller from '@/api/apiCaller'
import ActionButtons from '@/components/Login/actionButtons/ActionButtons'

async function fetchCartData(list,setter,myBooks){
    if (list && list.length > 0) {
        const listData = await Promise.all(
          (myBooks)?list.map((bookData) => apiCaller.searchByID(bookData.id)):list.map((bookId) => apiCaller.searchByID(bookId))
        );
        console.log("Fetched cart items:", listData);
        setter(listData);
    }
}


const CartPageComponent = (props) => {
    const {userDetails,setUserDetails} = UserAuth();
    const [Items,setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    let name="",email="";
    useEffect(()=>{
        if(userDetails){
            console.log(userDetails);
            name = userDetails.name;
            email = userDetails.email;
            const {cart,myBooks} = userDetails;
            (!props.myBooks)?fetchCartData(cart,setItems,props.myBooks).then(()=>setIsLoading(false)):
            fetchCartData(myBooks,setItems,props.myBooks).then(()=>setIsLoading(false));
        }
    },[userDetails]);

    if (isLoading) {
        return (
          <div className="cart__loading">
            <div className="cart__spinner"></div>
            <p>Loading...</p>
          </div>
        );
      }
    
    if (!userDetails) return null;
    return (
        <div>
             <div className="cart__page">
      <h1 className='cart__heading'>Cart Page for : {userDetails.name}</h1>

      {Items.length > 0 ? (
        Items.map((item) => (
          <div key={item._id} className="cart__item">
            <img
              src={item.coverLink}
              alt={item.name}
              className="cart__item__image"
            />
            <div className="cart__content">
                <div className="cart__item__details">
                <h3>{item.name}</h3>
                <p>By {item.author}</p>
                {props.myBooks && <div className='flex flex-wrap gap-2 mr-3'>
                  <p>Valid From: <b>{(new Date).toDateString()}</b></p> <p>Valid To: <b>{(new Date((new Date).getTime() + 2 * 24 * 60 * 60 * 1000)).toDateString()}</b></p>
                </div>
                }
                </div>
            { !props.myBooks && <ActionButtons details={item} />}
            { props.myBooks && 
            <button className='read__button'> READ </button>}
            </div>
          </div>
        ))
      ) : (
        <div className="cart__loading">No items Available.</div>
      )}
    </div>
        </div>
    )
}

export default CartPageComponent