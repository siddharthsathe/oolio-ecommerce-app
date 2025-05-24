'use client';
import ProductListing from "@/app//components/product/plp";
import { CartSidebar } from "@/app/components/cart/sidebar";
import "./app.css";

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
