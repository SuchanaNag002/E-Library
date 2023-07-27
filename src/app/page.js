"use client"
import styles from "./page.module.css";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../firebase/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
export default function Home() {
  const [user, setUser] = useAuthState(auth);
  const router = useRouter()
  useEffect(() => {
    if (!user) {
      router.push("/Login")
    }
  },[user]);
  return <main className="full_screen_wrapper">page.js of src/app</main>;
}
