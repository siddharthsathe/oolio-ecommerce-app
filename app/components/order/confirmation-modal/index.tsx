'use client';

import React from 'react';
import './index.css';

export function OrderConfirmationModal({ onClose }: { onClose: () => void }) {
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
                    <div className="item">
                        <img src="/images/tiramisu.jpg" alt="Classic Tiramisu" className="item-image" />
                        <div className="item-info">
                            <div>Classic Tiramisu <span className="meta">1x @$5.50</span></div>
                        </div>
                        <div className="item-price">$5.50</div>
                    </div>
                    <div className="item">
                        <img src="/images/creme-brulee.jpg" alt="Vanilla Bean Creme Brulee" className="item-image" />
                        <div className="item-info">
                            <div>Vanilla Bean Creme Brulee <span className="meta">4x @$7.00</span></div>
                        </div>
                        <div className="item-price">$28.00</div>
                    </div>
                    <div className="item">
                        <img src="/images/panna-cotta.jpg" alt="Vanilla Panna Cotta" className="item-image" />
                        <div className="item-info">
                            <div>Vanilla Panna Cotta <span className="meta">2x @$6.50</span></div>
                        </div>
                        <div className="item-price">$13.00</div>
                    </div>
                    <div className="item total">
                        <div>Order Total</div>
                        <div>$46.50</div>
                    </div>
                </div>

                <button className="new-order-btn" onClick={onClose}>Start New Order</button>
            </div>
        </div>
    );
}
