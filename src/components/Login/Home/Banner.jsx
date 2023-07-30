"use client"
import React from 'react'
import {BsSearch} from "react-icons/bs"


const Banner = (props) => {
    const [searchValue,setSearchValue] = [props.searchValue,props.setSearchValue];
    function handleSearch(e){
        setSearchValue(e.target.value);
    }
  return (
    <div className='banner'>
        <div className='banner__container'>
            <div className='banner__content'>
                <h1 className='banner__title'>E-Library</h1>
                <div className="banner__search">
                    <input type='text' className='banner__input' placeholder="Search" value={searchValue} onChange={handleSearch}></input>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default Banner