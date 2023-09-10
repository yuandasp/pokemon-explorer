"use client";

import { app } from "./firebase";
import {
  getFirestore,
  serverTimestamp,
  collection,
  addDoc,
} from "firebase/firestore";
import { db } from "./firebase";

export const firestore = getFirestore(app);

export const addUserToFirestore = async (dataUser) => {
  const formUser = {
    uid: dataUser.uid,
    name: dataUser.displayName,
    email: dataUser.email,
    photo: dataUser.photoURL,
    lastOnline: serverTimestamp(),
  };

  const userRef = collection(db, "users");

  await addDoc(userRef, formUser);
};
