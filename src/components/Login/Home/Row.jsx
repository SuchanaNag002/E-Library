import React, { useEffect, useState } from 'react'
import Card from './Card';
import "@/styles/home/Row.css";
import {MdArrowLeft,MdArrowRight} from "react-icons/md"


const Row = (props) => {
    const [bookList,setBookList] = useState([]);
    const [activeCard,setActiveCard] = useState(null);
    const rowRef = React.createRef();

    const scrollLeft = () => {
        if (rowRef.current)
        rowRef.current.scrollLeft -= 200;
    };
    const scrollRight = () => {
        if(rowRef.current)
        rowRef.current.scrollLeft += 200;
    };

    useEffect(()=>{
        props.callerFunction(props.cat).then((data)=>{
            setBookList(data);
        })
    },[]);
  return (
    <div className='row__container'>
        <h1 className='text-2xl font-bold mx-3'> Read {props.cat} Books</h1>
        {(activeCard===null)?<><div className="scroll__buttons h-full">
        <div className="scroll__button" onMouseDown={scrollLeft}>
          <MdArrowLeft />
        </div>
        <div className="scroll__button" onMouseDown={scrollRight}>
          <MdArrowRight />
        </div>
        </div></>:<></>}
      
        <div ref={rowRef} className='row'>
            {
                bookList.map((book)=>
                    <Card key={book._id} details={book} activeCard={activeCard} setActiveCard={setActiveCard}/>)
            }
        </div>
    </div>
   
  )
}

export default Row