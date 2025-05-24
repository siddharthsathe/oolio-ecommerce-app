'use client';
import ProductListing from "./components/product/plp";
import "./app.css";
import { CartSidebar } from "./components/cart/sidebar";
import { useEffect, useState } from "react";
import { callExternalApi } from "./actions";
import { ProductType } from "./components/product/types";

export default function Home() {

  return (
    <div className="app-container">
      <ProductListing />
      <aside className="cart-sidebar">
        <CartSidebar />
      </aside>
    </div>
  );
}
