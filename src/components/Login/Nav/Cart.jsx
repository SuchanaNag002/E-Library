import React from 'react'
import {BsFillCartFill} from "react-icons/bs"
import "@/styles/nav/cart.css"

const Cart = (props) => {
  return (
    <div className='cart text-2xl text-white relative'>
        <span className='cart__number'>{props.number}</span>
        <BsFillCartFill />
    </div>
  )
}

export default Cart