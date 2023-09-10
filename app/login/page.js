"use client";

import { UserAuth } from "@/app/context/AuthContext";
import { redirect } from "next/navigation";

function page() {
  const { user, googleSignIn } = UserAuth();

  if (user) return redirect("/");

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <main className="login-form">
      <div>
        <div className="login-form-headline">
          <p>Welcome to</p>
          <img
            src="/assets/pokemon-logo.png"
            alt=""
            width={280}
            id="imgLogo-login"
          />
          <p>Explorer!</p>
        </div>
        <p className="login-form-title">
          Sign in with your Google account to get started.
        </p>
        <button onClick={handleSignIn} className="login-button">
          <div style={{ width: "20px" }}>
            <img src="/assets/google-icon.png" alt="" width={24} />
          </div>
          <div style={{ width: "calc(100% - 20px)", marginLeft: "16px" }}>
            <p style={{ textAlign: "left" }}>Sign in with Google</p>
          </div>
        </button>
      </div>
    </main>
  );
}

export default page;
