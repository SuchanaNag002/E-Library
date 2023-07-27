import React from 'react'
import { useRouter } from 'next/navigation'
import apiCaller from '@/api/apiCaller';
import { UserAuth } from '@/context/authContext';

const Card = (props) => {
    const book = props.details;
    const router=useRouter();
    const {user,userDetails,setUserDetails} = UserAuth();
    if (!user || !userDetails) return null;
    function handleRouting(){
        router.push("/BookDetails/" + book._id);
    }
    function addToCart(){
      apiCaller.addToCart(user.email,book._id).then((data)=>{
        setUserDetails(data);
        console.log("ADDED",data);
      })
    }
  return (
    <div className='card flex flex-col'>
        <img className="cursor-pointer" src={book.coverLink} alt={book.name} onPointerDown={handleRouting}/>
        <h1 className='font-bold cursor-pointer' onPointerDown={handleRouting}>{book.name}</h1>
        <p className='flex gap-4 cursor-pointer' onPointerDown={handleRouting}><b>Genre: </b> {book.genre}</p> 
        <div className='card__buttons flex' >
            <button className='card__borrow'>Borrow</button>
            <button className='card__cart' onClick={addToCart}>Add To Cart</button>
        </div>
    </div>
  )
}

export default Card