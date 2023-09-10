"use client";
import { useContext, createContext, useState, useEffect } from "react";
import { auth } from "../../lib/firebase/firebase";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";
import { addUserToFirestore } from "@/lib/firebase/userController";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState("");

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const dataUser = result?.user;
        addUserToFirestore(dataUser);
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  };

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubcribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, googleSignIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
