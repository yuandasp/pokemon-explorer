"use client";

import React from "react";
import { gql, useQuery } from "@apollo/client";
import Loader from "@/components/Loader";
import { UserAuth } from "@/app/context/AuthContext";
import Swal from "sweetalert2";

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

  const getBackgroundColor = (color) => {
    const colorPokemon = color.toLowerCase();
    switch (colorPokemon) {
      case "green":
        return "#5dbe62";
        break;
      case "red":
        return "#fc6c6d";
        break;
      case "blue":
        return "#60a5fa";
        break;
      case "yellow":
        return "#edd53e";
        break;
      case "black":
        return "#0e1f40";
        break;
      case "brown":
        return "#d78555";
        break;
      case "purple":
        return "#b563ce";
        break;
      case "gray":
        return "#9a9da1";
        break;
      case "pink":
        return "#f85888";
        break;
      case "white":
        return "#98d8d8";
        break;
      default:
        return "#cec18c";
        break;
    }
  };

  const handleSavePokemon = async (img, name, userId, color, types) => {
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
        addPokemonToFirestore(img, name, userId, color, types);
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
            <div
              onClick={() =>
                handleSavePokemon(
                  pokemon.sprite,
                  pokemon.key,
                  userId,
                  pokemon.color,
                  pokemon.types
                )
              }
              className="cursor-pointer"
            >
              <img src="/assets/love-icon.png" alt="" width={50} height={50} />
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
            {pokemon.abilities?.first?.key ? (
              <li>
                <div style={{ marginBottom: "16px" }}>
                  <p className="abilities-key">
                    {pokemon.abilities?.first?.key || null}
                  </p>
                  <p>{pokemon.abilities?.first?.desc || null}</p>
                </div>
              </li>
            ) : null}
            {pokemon.abilities?.second?.key ? (
              <li>
                <div>
                  <p className="abilities-key">
                    {pokemon.abilities?.second?.key || null}
                  </p>
                  <p>{pokemon.abilities?.second?.desc || null}</p>
                </div>
              </li>
            ) : null}
            {pokemon.abilities?.hidden?.key ? (
              <li>
                <div>
                  <p className="abilities-key">
                    {pokemon.abilities?.hidden?.key || null}
                  </p>
                  <p>{pokemon.abilities?.hidden?.desc || null}</p>
                </div>
              </li>
            ) : null}
            {pokemon.abilities?.special?.key ? (
              <li>
                <div>
                  <p className="abilities-key">
                    {pokemon.abilities?.special?.key || null}
                  </p>
                  <p>{pokemon.abilities?.special?.desc || null}</p>
                </div>
              </li>
            ) : null}
          </ul>
        </div>

        <div className="container-baseStats-card">
          <p className="title">Base Stats</p>
          <div className="baseStats-card">
            <p>Attack</p>
            <p>{pokemon.baseStats.attack}</p>
            <div
              className="bar-stats"
              style={{ borderColor: `${getBackgroundColor(pokemonColor)}` }}
            >
              <div
                style={{
                  backgroundColor: `${getBackgroundColor(pokemonColor)}`,
                  height: "16px",
                  width: `${pokemon.baseStats.attack}%`,
                  borderRadius: "8px",
                }}
              ></div>
            </div>
          </div>
          <div className="baseStats-card">
            <p>Defense</p>
            <p>{pokemon.baseStats.defense}</p>
            <div
              className="bar-stats"
              style={{ borderColor: `${getBackgroundColor(pokemonColor)}` }}
            >
              <div
                style={{
                  backgroundColor: `${getBackgroundColor(pokemonColor)}`,
                  height: "16px",
                  width: `${pokemon.baseStats.defense}%`,
                  borderRadius: "8px",
                }}
              ></div>
            </div>
          </div>
          <div className="baseStats-card">
            <p>HP</p>
            <p>{pokemon.baseStats.hp}</p>
            <div
              className="bar-stats"
              style={{ borderColor: `${getBackgroundColor(pokemonColor)}` }}
            >
              <div
                style={{
                  backgroundColor: `${getBackgroundColor(pokemonColor)}`,
                  height: "16px",
                  width: `${pokemon.baseStats.hp}%`,
                  borderRadius: "8px",
                }}
              ></div>
            </div>
          </div>
          <div className="baseStats-card">
            <p>Special Attack</p>
            <p>{pokemon.baseStats.specialattack}</p>
            <div
              className="bar-stats"
              style={{ borderColor: `${getBackgroundColor(pokemonColor)}` }}
            >
              <div
                style={{
                  backgroundColor: `${getBackgroundColor(pokemonColor)}`,
                  height: "16px",
                  width: `${pokemon.baseStats.specialattack}%`,
                  borderRadius: "8px",
                }}
              ></div>
            </div>
          </div>
          <div className="baseStats-card">
            <p>Special Defense</p>
            <p>{pokemon.baseStats.specialdefense}</p>
            <div
              className="bar-stats"
              style={{ borderColor: `${getBackgroundColor(pokemonColor)}` }}
            >
              <div
                style={{
                  backgroundColor: `${getBackgroundColor(pokemonColor)}`,
                  height: "16px",
                  width: `${pokemon.baseStats.specialdefense}%`,
                  borderRadius: "8px",
                }}
              ></div>
            </div>
          </div>
          <div className="baseStats-card">
            <p>Speed</p>
            <p>{pokemon.baseStats.speed}</p>
            <div
              className="bar-stats"
              style={{ borderColor: `${getBackgroundColor(pokemonColor)}` }}
            >
              <div
                style={{
                  backgroundColor: `${getBackgroundColor(pokemonColor)}`,
                  height: "16px",
                  width: `${pokemon.baseStats.speed}%`,
                  borderRadius: "8px",
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
