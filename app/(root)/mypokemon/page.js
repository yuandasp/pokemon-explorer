"use client";
import React, { useEffect, useState } from "react";
import { UserAuth } from "@/app/context/AuthContext";
import { redirect } from "next/navigation";
import { db } from "../../../lib/firebase/firebase";
import { getDocs, collection, query, where } from "firebase/firestore";
import Loader from "@/components/Loader";
import Card from "@/components/Card";
import NoData from "@/components/NoData";

function page() {
  const { user } = UserAuth();
  const [loading, setLoading] = useState(true);
  const [pokemons, setPokemons] = useState([]);

  if (user === null) return redirect("/login");

  const getAllCatchedPokemon = async () => {
    const userId = user.uid || "";
    try {
      const q = query(
        collection(db, "catched_pokemons"),
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
      getAllCatchedPokemon();
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
      {loading && pokemons.length < 1 ? (
        <NoData />
      ) : (
        <>
          <p className="title-page">
            Your already catch {pokemons.length} Pokemon:
          </p>

          <div
            className="container-card-pokemon"
            style={{ justifyContent: "normal" }}
          >
            {pokemons.map((pokemon) => (
              <div key={pokemon.key}>
                <Card
                  name={pokemon.key}
                  img={pokemon.sprite}
                  types={pokemon.types}
                  color={pokemon.color}
                  catchRate={pokemon.catchRate}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default page;
