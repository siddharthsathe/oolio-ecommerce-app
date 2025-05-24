import { useCart, useCartDispatch } from "@/app/context/cart.context"
import { useCallback, useEffect, useState } from "react";
import './index.css';

export const CouponCode = () => {
    const [couponCodeInput, setCouponCodeInput] = useState<any | null>(null);
    const { discount } = useCart();
    const dispatch = useCartDispatch();

    useEffect(() => {
        if (discount && discount.isApplied) {
            setCouponCodeInput(() => 'ds');
        }
    }, [discount])

    const applyCouponCodeHandler = () => {
        if (couponCodeInput) {
            dispatch({
                type: "APPLY_COUPON_CODE",
                payload: {
                    couponCode: couponCodeInput
                }
            })
        }
    }

    const removeCouponCodeHandler = () => {
        setCouponCodeInput(null);

        dispatch({
            type: "REMOVE_COUPON_CODE",
            payload: {}
        })
    }

    const renderContent = useCallback(() => {
        if (discount?.isValid && discount?.isApplied) {
            return (
                <div className="coupon-applied">
                    <span className="applied-text-green">Coupon code applied!</span>
                    <button className="remove-coupon" onClick={() => removeCouponCodeHandler()}>
                        ✕
                    </button>
                </div>
            )
        } else if (!discount?.isValid && discount?.couponCode?.length) {
            return (
                <div>
                    <div className="coupon-applied">
                        <span className="applied-text-red">Invalid coupon code</span>
                        <button className="remove-coupon" onClick={() => removeCouponCodeHandler()}>
                            ✕
                        </button>

                    </div>

                    <div className="coupon-row">
                        <input
                            type="text"
                            placeholder="Enter coupon"
                            className="coupon-input"
                            value={couponCodeInput || ''}
                            onChange={(event) => setCouponCodeInput(event.target.value)}
                        />
                        <button
                            className="apply-button"
                            onClick={() => applyCouponCodeHandler()}
                            disabled={(couponCodeInput || '').trim() === ''}
                        >
                            Apply
                        </button>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <div className="coupon-label">Have a coupon?</div>
                    <div className="coupon-row">
                        <input
                            type="text"
                            placeholder="Enter coupon"
                            className="coupon-input"
                            value={couponCodeInput || ''}
                            onChange={(event) => setCouponCodeInput(event.target.value)}
                        />
                        <button
                            className="apply-button"
                            onClick={() => applyCouponCodeHandler()}
                            disabled={(couponCodeInput || '').trim() === ''}
                        >
                            Apply
                        </button>
                    </div>
                </div>
            )
        }
    }, [couponCodeInput, discount?.isValid, discount?.couponCode])

    return renderContent();
}