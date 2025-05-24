'use client';

import { TreePine } from 'lucide-react';
import { useCart, useCartDispatch } from '@/app/context/cart.context';
import { EmptyCart } from '@/app/components/cart/empty-cart';
import { useState } from 'react';
import { OrderConfirmationModal } from '@/app/components/order/confirmation-modal';
import { CouponCode } from '@/app/components/coupon-code';
import { useProduct } from '@/app/context/product.context';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './index.css';
import { callExternalApi } from '@/app/actions';

export const CartSidebar = () => {
    const { products, isLoading } = useProduct();
    const [showModal, setShowModal] = useState(false);
    const { items, total, discount } = useCart();
    const cartItems = Object.keys(items || {});
    const dispatch = useCartDispatch();

    const removeItemHandler = (productId: number) => {
        if (!productId) return;

        dispatch({
            type: "REMOVE_ITEM",
            payload: {
                id: String(productId)
            }
        })
    };

    const renderSkeleton = () => (
        <div>
            <h2 className="cart-title">
                <Skeleton width={180} height={28} />
            </h2>

            <div className="cart-items-holder">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div className="cart-item" key={i}>
                        <div className="item-details">
                            <Skeleton width={160} height={16} style={{ marginBottom: 8 }} />
                            <Skeleton width={120} height={14} />
                        </div>
                        <Skeleton circle width={24} height={24} />
                    </div>
                ))}
            </div>

            <div style={{ marginTop: 24, marginBottom: 16 }}>
                <Skeleton height={48} />
            </div>

            <div className="order-total-wrapper">
                <div className="order-total">
                    <Skeleton width={100} height={18} />
                    <Skeleton width={60} height={24} />
                </div>
            </div>

            <div className="carbon-message">
                <Skeleton width={250} height={24} />
            </div>
        </div>
    );

    const confirmOrderHandler = async () => {
        const data = await callExternalApi('api/order', "post", {
            ...(discount?.couponCode ? { couponCode: discount?.couponCode } : {}),
            items: Object.values(items).map(item => ({ productId: item.id, quantity: item.quantity }))
        });

        console.info('data--->', data);
        setShowModal(true);
    }

    return (
        <div>
            {isLoading ? renderSkeleton() : (
                <>
                    <div className="cart-header">
                        <h2 className="cart-title">Your Cart ({cartItems.length})</h2>
                    </div>

                    {cartItems.length > 0 ? (
                        <div>
                            <div className='cart-items-holder'>
                                {cartItems.map((item: any, index) => {
                                    const product = products.find(product => product.id === item);
                                    if (!product) return null;
                                    return (
                                        <div className="cart-item" key={index}>
                                            <div className="item-details">
                                                <p className="product-name">{product.name}</p>
                                                <p className="pricing">
                                                    <span>{items?.[item]?.quantity}x</span> @{`$${items?.[item].finalPrice.toFixed(2)}`}{" "}
                                                    <span className="line-total">
                                                        ${(items?.[item]?.quantity * items?.[item]?.finalPrice).toFixed(2)}
                                                    </span>
                                                </p>
                                            </div>
                                            <button onClick={() => removeItemHandler(item)} className="remove-btn">
                                                ×
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>


                            <hr className='mt-5' />
                            <CouponCode />

                            <div className="order-total-wrapper">
                                <div className="order-total">
                                    <span className="total-label">Order Total</span>
                                    <span className="total-amount">${total}</span>
                                </div>
                            </div>

                            <div className="carbon-message">
                                <TreePine className="carbon-icon" />
                                <span className="carbon-text">
                                    This is a carbon neutral delivery
                                </span>
                            </div>

                            <button className="confirm-btn" onClick={() => confirmOrderHandler()}> Confirm Order</button>
                        </div>
                    ) : <EmptyCart />}
                    {showModal && <OrderConfirmationModal onClose={() => setShowModal(false)} />}
                </>
            )}
        </div>
    );
};
