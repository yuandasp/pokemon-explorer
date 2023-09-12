"use client";
import { UserAuth } from "@/app/context/AuthContext";
import {
  addPokemonToFirestore,
  catchPokemonToFirestore,
} from "@/lib/firebase/pokemonController";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Swal from "sweetalert2";

const Card = ({ name, img, types, color, catchRate }) => {
  const pathname = usePathname();
  const { user } = UserAuth();
  const router = useRouter();
  const userId = user?.uid;
  const [imgSrc, setImgSrc] = useState(img);

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
        console.log({ randomNumber, rateToCatch });

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

  const typeNames = types.map((type) => type.name).join("/");

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

  return (
    <div
      className="card-pokemon img-card"
      style={{ backgroundColor: `${getBackgroundColor(color)}` }}
    >
      <div className="">
        <Image
          src={imgSrc}
          width={100}
          height={100}
          alt={name}
          onError={() => {
            setImgSrc("/assets/pokemon-ball-icon.png");
          }}
          className="img-tranform"
        />
      </div>

      <div style={{ margin: "auto", marginTop: "16px" }}>
        <p className="card-pokemon-name">{name}</p>

        <div className="card-type-text">{typeNames}</div>

        <div className="btn-in-card">
          {pathname === "/favorite" ? null : (
            <div
              onClick={() =>
                handleSavePokemon(img, name, userId, color, types, catchRate)
              }
              className="cursor-pointer container-icon"
            >
              <img src="/assets/love-icon.png" alt="" width={20} height={20} />
              <p className="label-icon-on-card">Like</p>
            </div>
          )}

          <Link
            href={`/pokemon/${name}`}
            style={{ textDecoration: "none", color: "white" }}
          >
            <div className="container-icon">
              <img src="/assets/info-icon.png" alt="" width={19} height={19} />
              <p className="label-icon-on-card">info</p>
            </div>
          </Link>

          {pathname === "/mypokemon" ? null : (
            <div
              onClick={() =>
                handleCatchPokemon(img, name, userId, color, types, catchRate)
              }
              className="cursor-pointer container-icon"
            >
              <Image
                src="/assets/pokemon-ball-icon.png"
                width={20}
                height={20}
                alt="catch"
              />
              <p className="label-icon-on-card">Catch!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
