import { AuthContextProvider } from "../context/AuthContext";
import "../globals.css";

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
        <body>
          <div>{children}</div>
        </body>
      </AuthContextProvider>
    </html>
  );
}
