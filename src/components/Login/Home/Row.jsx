import React, { useEffect, useState } from 'react'
import Card from './Card';
import "@/styles/home/Row.css";

const Row = (props) => {
    const [bookList,setBookList] = useState([]);
    useEffect(()=>{
        console.log("dsddsa");
        props.callerFunction(props.cat).then((data)=>{
            setBookList(data);
        })
    },[])
  return (
    <>
        <h1 className='text-2xl font-bold mx-3'> Read {props.cat} Books</h1>
        <div className='row flex'>
            {
                bookList.map((book)=>
                    <Card key={book._id} details={book} />)
            }
        </div>
    </>
   
  )
}

export default Row