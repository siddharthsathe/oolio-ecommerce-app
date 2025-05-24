'use client';

import React from 'react';
import './index.css';
import { OrderDetailsType } from './types';

interface IOrderConfirmationModalProps {
    onClose: () => void;
    orderDetails: OrderDetailsType;
}

export function OrderConfirmationModal({ orderDetails, onClose, }: IOrderConfirmationModalProps) {
    console.info('----orderDetails--', orderDetails);
    return (
        <div className="modal-backdrop">
            <div className="confirmation-modal">
                <div className="modal-header">
                    <div className="check-icon">
                        <span>✓</span>
                    </div>
                    <div className="confirmation-text">
                        <h2>Order Confirmed</h2>
                        <p>We hope you enjoy your food!</p>
                    </div>
                </div>

                <div className="order-details">
                    {orderDetails.products.map(product => {
                        const orderedItem = orderDetails?.orderedItems?.[product.id]
                        return (
                            <div className="item">
                                <img src={product.image?.thumbnail} alt="Classic Tiramisu" className="item-image" />
                                <div className="item-info">
                                    <div>{product.name} <span className="meta">{orderedItem?.quantity}x @{orderedItem?.finalPrice}</span></div>
                                </div>
                                <div className="item-price">${(orderedItem?.quantity || 1) * (orderedItem?.finalPrice || 0)}</div>
                            </div>
                        )
                    })}

                    <div className="item total">
                        <div>Order Total</div>
                        <div>${orderDetails.total.toFixed(2)}</div>
                    </div>
                </div>

                <button className="new-order-btn" onClick={onClose}>Start New Order</button>
            </div>
        </div>
    );
}
