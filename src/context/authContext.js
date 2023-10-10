"use client";
import { useContext, createContext, useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  signOut,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";
import apiCaller from "@/api/apiCaller";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  const logIn = () => {
    const googleAuth = new GoogleAuthProvider();
    signInWithPopup(auth, googleAuth);
  };
  const logOut = () => {
    signOut(auth);
  };
  const setUserSettings = (currentUser) => {
    if (currentUser) {
      apiCaller
        .getUserDetails(currentUser.email, currentUser.displayName)
        .then((data) => {
          setUserDetails(data);
        });
    }
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Use the user state managed in this context
      if (currentUser) {
        setUserSettings(currentUser);
      } else {
        setUserSettings(null); // Set userDetails to null when user is not authenticated
      }
    });

    return () => unsubscribe();
  }, []);
  return (
    <AuthContext.Provider
      value={{ user, userDetails, logIn, logOut, setUserDetails }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
