"use client"
import React,{useState} from 'react'
import { FcGoogle } from "react-icons/fc";
import { UserAuth } from '@/context/authContext';
import LoadingPage from '@/page-components/Loading';

const LoginButton = () => {
  const [loading,setLoading] = useState(false);
  const {logIn} = UserAuth();
  const login = async () => {
    try {
      setLoading(true);
      await logIn();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
        <LoadingPage />
        <button
            onClick={login}
            className="flex items-center justify-center px-8 py-3 text-sm sm:text-base bg-black hover:bg-slate-800
            rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 active:scale-75 text-white">
            <FcGoogle className="mr-2" />
            LOGIN
    </button>
  </>
  )
}

export default LoginButton