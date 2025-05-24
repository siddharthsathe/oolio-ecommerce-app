'use client';

import React from 'react';
import { ProductType } from '../types/index';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
// import { useCart } from '../context/CartContext';
import './index.css';

type Props = {
    product: ProductType;
};

const ProductCard: React.FC<Props> = ({ product }) => {
    // const { cart, addToCart, removeFromCart } = {cart: {'':}}
    // const quantity = cart[product.id]?.quantity || 0;
    const quantity = 0

    const addToCart = (product: any) => { };

    const removeFromCart = (product: any) => { };


    return (
        <div className={`product-card ${quantity > 0 ? 'active' : ''}`}>
            <div className="product-image-wrapper">
                <img src={product.image} alt={product.name} className="product-image" />

                <div className="button-wrapper">
                    {quantity === 0 ? (
                        <button className="add-button" onClick={() => addToCart(product)}>
                            <ShoppingCart size={18} />
                            <span>Add to Cart</span>
                        </button>
                    ) : (
                        <div className="quantity-controls">
                            <button onClick={() => removeFromCart(product.id)}>
                                <Minus size={16} />
                            </button>
                            <span>{quantity}</span>
                            <button onClick={() => addToCart(product)}>
                                <Plus size={16} />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="product-info">
                <p className="product-category">{product.category}</p>
                <h4 className="product-name">{product.name}</h4>
                <p className="product-price">${product.price.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default ProductCard;
