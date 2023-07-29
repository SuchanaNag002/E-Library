"use client"
import React,{useEffect,useState} from 'react'
import apiCaller from '@/api/apiCaller';
import { UserAuth } from '@/context/authContext';

function bookInArray(id,array){
    if(!array) return false;
    const index = array.findIndex(book_id => book_id.toString() === id.toString());
    return index >=0;
}

const ActionButtons = (props) => {
    const {user,userDetails,setUserDetails} = UserAuth();
    const [inCart,setInCart] = useState(false);
    const book = props.details;
    function addToCart(){
        apiCaller.addToCart(user.email,book._id).then((data)=>{
          if(data && data.success){
            setUserDetails(data.value);
          }
        })
    }
    useEffect(()=>{
        if(userDetails && bookInArray(book._id , userDetails.cart)){
            setInCart(true);
        } else {
            setInCart(false);
        }
    },[userDetails]);
    if (!user || !userDetails) return null;
    return (
            <div className='card__buttons flex' >
                <button className='card__borrow'>Borrow</button>
                <button className={'card__cart ' + ((inCart)?" inCart":"")} onMouseDown={addToCart}>{(inCart)?"Remove":"Add To Cart"}</button>
            </div>
    )
}

export default ActionButtons