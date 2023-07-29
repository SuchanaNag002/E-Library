import React from 'react'
import Row from '@/components/Login/Home/Row';
import apiCaller from '@/api/apiCaller';
const HomePage = () => {
  return (
    <div className='home'>

      <Row cat="Physics" callerFunction={apiCaller.searchByCatagory}/>
      <Row cat="Computer Science" callerFunction={apiCaller.searchByCatagory}/>
      <Row cat="Mathematics" callerFunction={apiCaller.searchByCatagory}/>
      <Row cat="Biology" callerFunction={apiCaller.searchByCatagory}/>
      <Row cat="Technology" callerFunction={apiCaller.searchByCatagory}/>
    </div>
  )
}
export default HomePage;
