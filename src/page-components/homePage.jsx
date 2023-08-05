"use client"
import React,{useEffect, useState} from 'react'
import "@/styles/home/home.css";
import Row from '@/components/Login/Home/Row';
import apiCaller from '@/api/apiCaller';
import Banner from '@/components/Login/Home/Banner';
import Card from '@/components/Login/Home/Card';

const HomePage = () => {
  const [searchValue,setSearchValue] = useState("");
  const [bList,setBList] = useState([]);

  useEffect(()=>{
    apiCaller.search(100).then((results)=>{setBList(results)});
  },[]);

  return (
    <div className='home'>
      <Banner searchValue={searchValue} setSearchValue={setSearchValue} />
      {(searchValue==="")?
      <>
        <Row cat="Physics" callerFunction={apiCaller.searchByCatagory}/>
        <Row cat="Computer Science" callerFunction={apiCaller.searchByCatagory}/>
        <Row cat="Mathematics" callerFunction={apiCaller.searchByCatagory}/>
        <Row cat="Biology" callerFunction={apiCaller.searchByCatagory}/>
        <Row cat="Technology" callerFunction={apiCaller.searchByCatagory}/>
      </>:
      <>  
          <h1 className='text-2xl m-8'>Searching For: {searchValue }</h1>
          <div className='flex flex-wrap items-center justify-center'>
          {bList.filter(item => {
            const { name, author, genre, ...rest } = item;
            return [author, name, genre].some(value => (new RegExp(`.*${searchValue}.*`, "i")).test(value));
          }).map((b) => <Card key={b._id} details={b} />)}
          </div>
      </>}
      
    </div>
  )
}
export default HomePage;
