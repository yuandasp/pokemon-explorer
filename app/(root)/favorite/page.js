"use client";

import React, { useEffect, useState } from "react";
import { UserAuth } from "@/app/context/AuthContext";
import { redirect } from "next/navigation";
import { db } from "../../../lib/firebase/firebase";
import { getDocs, collection, query, where } from "firebase/firestore";
import Loader from "@/components/Loader";
import Card from "@/components/Card";

function page() {
  const { user } = UserAuth();
  const [loading, setLoading] = useState(true);
  const [pokemons, setPokemons] = useState([]);

  if (user === null) return redirect("/login");

  const getFavoritPokemon = async () => {
    const userId = user.uid || "";
    try {
      const q = query(
        collection(db, "pokemons"),
        where("userId", "==", userId)
      );
      const querySnapshot = await getDocs(q);
      const dataPokemon = [];
      querySnapshot.forEach((doc) => {
        dataPokemon.push(doc.data());
      });

      setPokemons(dataPokemon);
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    if (user.uid) {
      getFavoritPokemon();
    }
  }, [user.uid]);

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 5));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);

  if (loading) return <Loader />;

  return (
    <div className="container-list-pokemon">
      {pokemons.length < 1 ? null : (
        <>
          <p className="title-page">Your favorite pokemons:</p>

          <div
            className="container-card-pokemon"
            style={{ justifyContent: "normal" }}
          >
            {pokemons.length > 0
              ? pokemons.map((pokemon) => (
                  <div key={pokemon.key}>
                    <Card
                      name={pokemon.key}
                      img={pokemon.sprite}
                      types={pokemon.types}
                      color={pokemon.color}
                    />
                  </div>
                ))
              : null}
          </div>
        </>
      )}
    </div>
  );
}

export default page;
