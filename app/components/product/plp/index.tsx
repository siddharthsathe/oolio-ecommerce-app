'use client';
import { useCart, useCartDispatch } from '@/app/context/cart.context';
import { useProduct, useProductDispatch } from "@/app/context/product.context";
import { useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ProductListing = () => {
    const { products, isLoading } = useProduct();
    const { items } = useCart();
    const cartDispatch = useCartDispatch();
    const productDispatch = useProductDispatch();

    useEffect(() => {
        productDispatch({ type: "FETCH_PRODUCTS", payload: { data: [] } })
    }, [])

    const addToCartHandler = (productId: number) => {
        const product = products.find(item => item.id === productId);
        if (!product) return;
        cartDispatch({
            type: 'ADD_ITEM',
            payload: {
                id: String(productId),
                name: product?.name,
                price: product?.price,
                finalPrice: product.price,
                quantity: 1,
            },
        });
    };

    const modifyItemInCart = (productId: number, type?: "increase" | "decrease") => {
        const product = products.find(item => item.id === productId);
        if (!product) return;
        cartDispatch({
            type: type === "decrease" ? "DECREMENT_QUANTITY" : "INCREMENT_QUANTITY",
            payload: {
                id: String(productId),
            },
        });
    };

    return (
        <main className="main-content">
            {
                isLoading ?
                    <div className="product-grid">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="product-card">
                                <div className="image-container">
                                    <Skeleton height={160} borderRadius={8} />
                                </div>
                                <div style={{ margin: "16px" }}>
                                    <Skeleton width={100} height={16} /> {/* category */}
                                    <Skeleton width={`80%`} height={20} style={{ marginTop: 8 }} /> {/* name */}
                                    <Skeleton width={60} height={18} style={{ marginTop: 8 }} /> {/* price */}
                                </div>
                            </div>
                        ))}
                    </div>
                    : (
                        <>
                            <h1 className="title">Desserts</h1>
                            <div className="product-grid">
                                {products.map((product, index) => (
                                    <div key={index} className={`product-card ${items?.[product.id] ? 'active' : ''}`}>
                                        <div className="image-container">
                                            <img src={product.image.desktop} alt={product.name} className="product-image" />
                                            {
                                                items?.[product.id] ? (
                                                    <div className="quantity-controls">
                                                        <button onClick={() => modifyItemInCart(product.id, "decrease")}>-</button>
                                                        <span>{items[product.id]?.quantity}</span>
                                                        <button onClick={() => modifyItemInCart(product.id, "increase")}>+</button>
                                                    </div>
                                                ) : (
                                                    <button className="add-to-cart" onClick={() => addToCartHandler(product.id)}>
                                                        <ShoppingCart className="icon" size={16} />
                                                        Add to Cart
                                                    </button>

                                                )
                                            }
                                        </div>
                                        <div className="product-info">
                                            <span className="product-category">{product.category}</span>
                                            <h2 className="product-name">{product.name}</h2>
                                            <p className="product-price">${product.price.toFixed(2)}</p>
                                        </div>
                                    </div>

                                ))}
                            </div>
                        </>

                    )
            }
        </main>

    )
}

export default ProductListing;
