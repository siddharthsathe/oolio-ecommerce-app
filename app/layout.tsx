'use client';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./context/cart.context";
import { ProductProvider } from "./context/product.context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      ><ProductProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </ProductProvider>
      </body>
    </html>
  );
}
