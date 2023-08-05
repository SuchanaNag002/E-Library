"use client";
import { auth } from "../firebase/firebaseConfig";
import { UserAuth } from "@/context/authContext";
import { useEffect} from "react";
import LoginButton from "@/components/Login/LoginButton";
import { useRouter } from "next/navigation";


export default function Login() {
  const router = useRouter();
  const {user} = UserAuth();
  useEffect(() => {
    if(user){
      router.push("/")
    }
  }, [user]);
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 
    flex flex-col items-center justify-center min-h-screen min-w-full">
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
        <h1 className="text-4xl font-black sm:text-5xl md:text-6xl lg:text-7xl text-center mb-4 text-w">
          E-Learning Library
        </h1>
      </div>
      <p className=" lg:w-9/12 my-6 text-base font-medium sm:text-lg md:text-xl lg:text-2xl text-center mb-8">
      {"Dive into a world of boundless knowledge and captivating stories at our E-Library. Embark on a literary journey like no other, where imagination knows no bounds, and the wonders of literature await you. Whether you are a seasoned bookworm or a curious explorer, our vast collection caters to every readers taste and curiosity."}  
      </p>
      <LoginButton />
    </div>
  );
}
