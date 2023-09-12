"use client";

import { UserAuth } from "@/app/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Swal from "sweetalert2";

function Navbar() {
  const pathname = usePathname();
  const { user, logOut } = UserAuth();
  const [loading, setLoading] = useState(true);

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const confirmationLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        handleSignOut();
      }
    });
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);

  return (
    <nav className="navbar">
      <div id="navbar-logo">
        <Link href="/">
          <Image
            src="/assets/pokemon-logo.png"
            width={100}
            height={40}
            alt="pokemon explorer"
            priority={true}
          />
        </Link>
      </div>
      <div className="nav-items">
        {pathname === "/" ? (
          <div className="nav-items-active">
            <Link href="/">
              <p>Home</p>
            </Link>
          </div>
        ) : (
          <div className="nav-items-regular">
            <Link href="/">
              <p>Home</p>
            </Link>
          </div>
        )}

        {pathname === "/favorite" ? (
          <div className="nav-items-active">
            <Link href="/favorite">
              <p>Favorite</p>
            </Link>
          </div>
        ) : (
          <div className="nav-items-regular ">
            <Link href="/favorite">
              <p>Favorite</p>
            </Link>
          </div>
        )}

        {pathname === "/mypokemon" ? (
          <div className="nav-items-active">
            <Link href="/mypokemon">
              <p>My Pokemon</p>
            </Link>
          </div>
        ) : (
          <div className="nav-items-regular ">
            <Link href="/mypokemon">
              <p>My Pokemon</p>
            </Link>
          </div>
        )}
      </div>

      <div className="nav-items-login">
        {loading ? null : !user ? (
          <Link href="/login">
            <button className="log-in-btn">Login</button>
          </Link>
        ) : (
          <>
            <p id="navbar-logo">
              Welcome, <b>{user.displayName}</b>
            </p>
            <div onClick={confirmationLogout} className="log-out-btn">
              <img src="/assets/logout-icon.png" width={28} height={28} />
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
