"use client";
import { auth } from "../firebase/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useEffect} from "react";
import { FaGoogle } from "react-icons/fa";
import { useRouter } from "next/navigation";
export default function Login() {
  const router = useRouter();
  const [user, setUser] = useAuthState(auth);
  const googleAuth = new GoogleAuthProvider();
  const login = async () => {
    const res = await signInWithPopup(auth, googleAuth);
  };
  useEffect(() => {
    console.log(user);
    if(user){
      router.push("/")
    }
  }, [user]);
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center justify-center min-h-screen">
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center mb-4">
          E-Learning Library
        </h1>
      </div>
      <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-center mb-8">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
      <button
        onClick={login}
        className="flex items-center justify-center px-6 py-3 text-sm sm:text-base bg-blue-300 hover:bg-blue-400 text-black rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105"
      >
        <FaGoogle className="mr-2" />
        LOGIN
      </button>
    </div>
  );
}
