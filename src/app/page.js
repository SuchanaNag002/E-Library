"use client"
import styles from "./page.module.css";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserAuth } from "@/context/authContext";
import HomePage from "@/page-components/homePage";
export default function Home() {
  const router = useRouter();
  const {user,userDetails} = UserAuth();
  useEffect(() => {
    if (!user) {
      router.push("/Login");
    }
  },[user]);

  return (
    <>
      <HomePage />
    </>
  )
}
