import { Providers } from "@/components/Providers";
import "../globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import { AuthContextProvider } from "../context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pokemon Explorer!",
  description:
    "Your Gateway to the Pokemon Universe! Explore the vibrant and expansive world of Pokemon on our website.",
  icons: {
    icon: "/icon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthContextProvider>
        <Providers>
          <body className={inter.className}>
            <Navbar />
            <div className="bg-allpage">{children}</div>
          </body>
        </Providers>
      </AuthContextProvider>
    </html>
  );
}
