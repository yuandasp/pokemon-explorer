"use client";

import React from "react";
import { gql, useQuery } from "@apollo/client";
import Loader from "@/components/Loader";
import { UserAuth } from "@/app/context/AuthContext";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import {
  addPokemonToFirestore,
  catchPokemonToFirestore,
} from "@/lib/firebase/pokemonController";
import { getBackgroundColor } from "@/lib/getBackgroundColor";
import BarStats from "@/components/BarStats";
import AbilitiesCard from "@/components/AbilitiesCard";
import Image from "next/image";

const pokemonDetail = gql`
  query GetPokemon($pokemon: PokemonEnum!) {
    getPokemon(pokemon: $pokemon) {
      key
      sprite
      color
      abilities {
        first {
          key
          desc
        }
        second {
          key
          desc
        }
        special {
          key
          desc
        }
        hidden {
          key
          desc
        }
      }
      backSprite
      types {
        name
      }
      catchRate {
        percentageWithOrdinaryPokeballAtFullHealth
      }
      baseStats {
        attack
        defense
        hp
        specialattack
        specialdefense
        speed
      }
      baseStatsTotal
    }
  }
`;

function page({ params }) {
  const router = useRouter();
  const { user } = UserAuth();
  const userId = user?.uid;
  const idPokemon = params.id;
  const { loading, error, data } = useQuery(pokemonDetail, {
    variables: { pokemon: idPokemon },
  });

  if (loading) return <Loader />;
  if (error) return <p>Error : {error.message}</p>;

  const pokemon = data?.getPokemon || [];
  const pokemonColor = pokemon.color;
  const typeNames = pokemon.types.map((type) => type.name).join("/");

  const handleSavePokemon = async (
    img,
    name,
    userId,
    color,
    types,
    catchRate
  ) => {
    if (user === null) {
      Swal.fire({
        title: "You must login first!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/login");
        }
      });
    } else {
      try {
        Swal.fire("Saved!", "You add this pokemon as your Favorite", "success");
        addPokemonToFirestore(img, name, userId, color, types, catchRate);
      } catch (error) {
        throw new Error(error.message);
      }
    }
  };

  const handleCatchPokemon = async (
    img,
    name,
    userId,
    color,
    types,
    catchRate
  ) => {
    if (user === null) {
      Swal.fire({
        title: "You must login first!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/login");
        }
      });
    } else {
      try {
        const randomNumber = Math.floor(Math.random() * 100);
        const catchArr = catchRate.split("%");
        const rateToCatch = Number(catchArr[0]);

        Swal.fire({
          title: null,
          html: `
            <div className="loader">
              <img src="/assets/loader-catch-pokemon.gif" alt="" width={240} />
              <p style={{ marginTop: "16px" }}>Catching pokemon...</p>
            </div>
          `,
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
        }).then((result) => {
          if (randomNumber < rateToCatch) {
            Swal.fire("Congratulations!", "You catch this pokemon", "success");
            catchPokemonToFirestore(img, name, userId, color, types, catchRate);
            router.push("/mypokemon");
          } else {
            Swal.fire(
              "Try again!",
              "You failed to catch this pokemon",
              "warning"
            );
          }
        });
      } catch (error) {
        throw new Error(error.message);
      }
    }
  };

  return (
    <div className="detail-page">
      <div
        className="card-detail-top"
        style={{ backgroundColor: `${getBackgroundColor(pokemonColor)}` }}
      >
        <div className="card-detail-img">
          <img
            src={pokemon.sprite}
            alt={pokemon.key}
            width={200}
            height={200}
            className="img-tranform"
          />
        </div>
        <div className="card-detail-headline">
          <div>
            <p className="pokemon-name">{pokemon.key}</p>
          </div>
          <div className="type-and-like">
            <p className="pokemon-types">{typeNames}</p>

            <div className="container-btn-card-detail">
              <div
                onClick={() =>
                  handleSavePokemon(
                    pokemon.sprite,
                    pokemon.key,
                    userId,
                    pokemon.color,
                    pokemon.types,
                    pokemon.catchRate.percentageWithOrdinaryPokeballAtFullHealth
                  )
                }
                className="cursor-pointer btn-icon-card-detail"
              >
                <Image
                  src="/assets/love-icon.png"
                  alt="like"
                  width={36}
                  height={36}
                />
                <p>Like</p>
              </div>

              <div
                onClick={() =>
                  handleCatchPokemon(
                    pokemon.sprite,
                    pokemon.key,
                    userId,
                    pokemon.color,
                    pokemon.types,
                    pokemon.catchRate.percentageWithOrdinaryPokeballAtFullHealth
                  )
                }
                className="cursor-pointer btn-icon-card-detail"
              >
                <Image
                  src="/assets/pokemon-ball-icon.png"
                  width={36}
                  height={36}
                  alt="catch"
                />
                <p className="">Catch!</p>
              </div>
            </div>
          </div>
        </div>
        <div className="backsprite-detail-card">
          <img
            src={pokemon.backSprite}
            alt={pokemon.key}
            width={200}
            height={200}
            className="img-tranform"
          />
        </div>
      </div>

      <div className="card-detail-bottom">
        <div className="abilities-card">
          <p className="title">Abilities</p>
          <ul>
            <AbilitiesCard abilities={pokemon.abilities?.first} />
            <AbilitiesCard abilities={pokemon.abilities?.second} />
            <AbilitiesCard abilities={pokemon.abilities?.hidden} />
            <AbilitiesCard abilities={pokemon.abilities?.special} />
          </ul>
        </div>

        <div className="container-baseStats-card">
          <p className="title">Base Stats</p>

          <BarStats
            title="Attack"
            statNum={pokemon.baseStats.attack}
            pokemonColor={pokemonColor}
          />

          <BarStats
            title="Defense"
            statNum={pokemon.baseStats.defense}
            pokemonColor={pokemonColor}
          />

          <BarStats
            title="HP"
            statNum={pokemon.baseStats.hp}
            pokemonColor={pokemonColor}
          />

          <BarStats
            title="Special Attack"
            statNum={pokemon.baseStats.specialattack}
            pokemonColor={pokemonColor}
          />

          <BarStats
            title="Special Defense"
            statNum={pokemon.baseStats.specialdefense}
            pokemonColor={pokemonColor}
          />

          <BarStats
            title="Speed"
            statNum={pokemon.baseStats.speed}
            pokemonColor={pokemonColor}
          />
        </div>
      </div>
    </div>
  );
}

export default page;
