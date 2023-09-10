"use client";

import Loader from "@/components/Loader";
import Card from "../../components/Card";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

const GetAllPokemons = gql`
  query ($offset: Int, $take: Int) {
    getAllPokemon(offset: $offset, take: $take) {
      key
      sprite
      color
      types {
        name
      }
    }
  }
`;

export default function Home() {
  // NOTE: To skip all CAP Pokémon, PokéStar Pokémon, Missingno, and 'M (00) provide an offset of 89
  const offset = 89;
  const [take, setTake] = useState(100);
  const { loading, error, data, fetchMore } = useQuery(GetAllPokemons, {
    variables: { offset: offset, take: take },
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [value] = useDebounce(searchTerm, 1000);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (!searchTerm) {
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        let newTake = take + 100;

        if (newTake === 1392) {
          return;
        }

        if (newTake > 1392) {
          newTake = 1392;
        }

        fetchMore({
          variables: {
            take: newTake,
          },
        });
        setTake(newTake);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [take]);

  const pokemonsFromQuery = data?.getAllPokemon.filter((pokemon) =>
    pokemon.key.includes(value)
  );

  const searchHandler = (value) => {
    setSearchTerm(value);
  };

  if (loading) return <Loader />;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <main className="container-list-pokemon">
      <div className="container-search">
        <input
          placeholder="Search pokemon..."
          onChange={(e) => searchHandler(e.target.value)}
          className="searchbar-input"
        />
      </div>

      <div className="container-card-pokemon">
        {pokemonsFromQuery.map((pokemon, index) => (
          <div key={pokemon.key}>
            <Card
              name={pokemon.key}
              img={pokemon.sprite}
              types={pokemon.types}
              color={pokemon.color}
            />
          </div>
        ))}
      </div>
    </main>
  );
}
