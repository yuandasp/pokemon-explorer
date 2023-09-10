"use client";

import { app } from "./firebase";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export const firestore = getFirestore(app);

export const addPokemonToFirestore = async (
  img,
  name,
  idUser,
  color,
  types
) => {
  const dataPokemon = {
    key: name,
    sprite: img,
    userId: idUser,
    color: color,
    types: types,
  };

  await setDoc(doc(db, "pokemons", name), dataPokemon);
};
