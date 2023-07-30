import React from 'react'
import {BsFillCartFill} from "react-icons/bs"
import "@/styles/nav/cart.css"
import Link from 'next/link'

const Cart = (props) => {
  return (
    <>
      <Link href="/CartPage">
        <div className='cart text-2xl text-white relative'>
            <span className='cart__number'>{props.number}</span>
            <BsFillCartFill />
        </div>
      </Link>
    </>
  )
}

export default Cart