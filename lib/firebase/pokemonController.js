"use client";

import { app } from "./firebase";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  addDoc,
} from "firebase/firestore";
import { db } from "./firebase";

export const firestore = getFirestore(app);

export const addPokemonToFirestore = async (
  img,
  name,
  idUser,
  color,
  types,
  catchRate
) => {
  const dataPokemon = {
    key: name,
    sprite: img,
    userId: idUser,
    color: color,
    types: types,
    catchRate: catchRate,
  };

  await setDoc(doc(db, "pokemons", name), dataPokemon);
};
export const catchPokemonToFirestore = async (
  img,
  name,
  idUser,
  color,
  types,
  catchRate
) => {
  const dataPokemon = {
    key: name,
    sprite: img,
    userId: idUser,
    color: color,
    types: types,
    catchRate: catchRate,
  };

  await addDoc(collection(db, "catched_pokemons"), dataPokemon);
};
