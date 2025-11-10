import "./globals.css";
import { CartProvider } from "../components/CartContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Roblox Shop",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
