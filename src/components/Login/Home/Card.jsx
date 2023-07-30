
import React,{useRef} from 'react'
import { useRouter } from 'next/navigation'
import ActionButtons from '../actionButtons/ActionButtons';
import {MdClose} from 'react-icons/md'

const Card = (props) => {
    const book = props.details;
    const cardRef = useRef(null);
    const router=useRouter();
    function handleRouting(){
        router.push("/BookDetails/" + book._id);
        // props.setActiveCard(book._id);
    }
    function handleClose(){
      props.setActiveCard(null);
    }
    
  return (
    <>
    <div ref={cardRef} className='card'>
        <><img className="cursor-pointer" src={book.coverLink} alt={book.name} onClick={handleRouting}/>
        <h1 className='font-bold cursor-pointer' onClick={handleRouting}>{book.name}</h1>
        <p className='flex gap-4 cursor-pointer' onClick={handleRouting}><b>Genre: </b> {book.genre}</p> 
        <ActionButtons details={book}/>
        </>
    </div> 
        
      </>
  )
}

export default Card