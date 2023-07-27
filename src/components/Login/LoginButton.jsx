import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { UserAuth } from '@/context/authContext';

const LoginButton = () => {
  const {logIn} = UserAuth();
  const login = async () => {
    try {
      await logIn();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
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