import React, {
    createContext,
    useContext,
    useReducer,
    useEffect,
    ReactNode,
} from 'react';

export type CartItem = {
    id: string;
    name: string;
    price: number;
    finalPrice: number; // after discount
    quantity: number;
};

type CartState = {
    total: number;
    items: {
        [productId: string]: CartItem;
    };
    discount?: {
        isApplied: boolean;
        discountAmount: number;
        couponCode: string | null;
        isValid: boolean
    }
};

type Action =
    | { type: 'ADD_ITEM'; payload: CartItem }
    | { type: 'REMOVE_ITEM'; payload: { id: string } }
    | { type: 'INCREMENT_QUANTITY'; payload: { id: string } }
    | { type: 'DECREMENT_QUANTITY'; payload: { id: string } }
    | { type: 'CLEAR_CART' }
    | { type: 'SET_CART'; payload: CartState }
    | { type: "APPLY_COUPON_CODE"; payload: { couponCode: string } }
    | { type: "REMOVE_COUPON_CODE"; payload: {} };

const LOCAL_STORAGE_KEY = 'app_cart';

const getCartTotal = (items: { [productId: string]: CartItem }, discountAmount?: number) => {
    const totalWithoutDiscount = Object.values(items).reduce(
        (sum, item) => sum + item.finalPrice * item.quantity,
        0
    );
    return totalWithoutDiscount - (discountAmount || 0);
};

const cartReducer = (state: CartState, action: Action): CartState => {
    let updatedCart = { items: { ...state.items }, discount: { ...state.discount } };

    switch (action.type) {
        case 'ADD_ITEM': {
            const { id, name, price } = action.payload;
            const existing = updatedCart.items[id];

            updatedCart.items[id] = existing
                ? { ...existing, quantity: existing.quantity + 1 }
                : { id, name, price, finalPrice: price, quantity: 1 };

            break;
        }

        case 'REMOVE_ITEM': {
            delete updatedCart.items[action.payload.id];
            break;
        }

        case 'INCREMENT_QUANTITY': {
            const item = updatedCart.items[action.payload.id];
            if (item) {
                updatedCart.items[action.payload.id] = {
                    ...item,
                    quantity: item.quantity + 1,
                };
            }
            break;
        }

        case 'DECREMENT_QUANTITY': {
            const item = updatedCart.items[action.payload.id];
            if (item) {
                if (item.quantity <= 1) {
                    delete updatedCart.items[item.id];
                } else {
                    updatedCart.items[item.id] = {
                        ...item,
                        quantity: item.quantity - 1,
                    };
                }
            }
            break;
        }

        case 'CLEAR_CART': {
            return { items: {}, total: 0 }
        }

        case 'SET_CART': {
            return action.payload;
        }

        case 'APPLY_COUPON_CODE': {
            // let items = state.items;
            let discountAmount = 0;
            let isDiscountApplied = false;
            let objItems = { ...state.items };
            let total = state.total;
            if (action.payload.couponCode === "HAPPYHOURS") {
                discountAmount = state.total * 18 / 100;
                isDiscountApplied = true;
            } else if (action.payload.couponCode === "BUYGETONE") {
                const itemKeys = Object.keys(updatedCart.items);
                // sort the item to get lowest priced product, then modify it to 0 and keep others as it is
                const arrayOfProductsInCart = itemKeys.map(item => ({ ...updatedCart.items[item] })).sort((a, b) => a.price * a.quantity - b.price * b.quantity).map((item, index) => index === 0 ? ({ ...item, price: item.price, finalPrice: 0 }) : item)
                total = arrayOfProductsInCart.reduce((pv, cv) => {
                    return cv.finalPrice * cv.quantity + pv
                }, 0);

                // set them back to dict 
                objItems = arrayOfProductsInCart.reduce<Record<any, any>>((acc, item) => {
                    acc[item.id] = item;
                    return acc;
                }, {});

                isDiscountApplied = true;
            }

            updatedCart = {
                items: objItems,
                discount: {
                    isApplied: isDiscountApplied,
                    discountAmount,
                    isValid: isDiscountApplied,
                    couponCode: action.payload.couponCode
                }
            }
            break;
        }

        case 'REMOVE_COUPON_CODE': {
            let items = state.items;
            let objItems = {};
            let total = state.total;

            const itemKeys = Object.keys(items);
            // sort the item to get lowest priced product, then modify it to 0 and keep others as it is
            const arrayOfProductsInCart = itemKeys.map(item => ({ ...items[item] })).sort((a, b) => a.price - b.price).map((item, index) => ({ ...item, finalPrice: item.price }))
            total = arrayOfProductsInCart.reduce((pv, cv) => {
                return cv.finalPrice * cv.quantity + pv
            }, 0);

            // set them back to dict 
            objItems = arrayOfProductsInCart.reduce<Record<any, any>>((acc, item) => {
                acc[item.id] = item;
                return acc;
            }, {});

            updatedCart = {
                items: objItems,
                discount: {
                    couponCode: null,
                    isValid: false,
                    isApplied: false,
                    discountAmount: 0
                }
            };
            break;
        }

        default:
            return state;
    }

    const total = getCartTotal(updatedCart.items, updatedCart.discount.discountAmount);

    const newState = {
        items: updatedCart.items,
        total: Number(total.toFixed(2)),
        discount: {
            discountAmount: updatedCart.discount.discountAmount || 0,
            isApplied: updatedCart.discount.isApplied || false,
            isValid: updatedCart.discount.isValid || false,
            couponCode: updatedCart.discount.couponCode || ''
        }
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState));
    return newState;
};

const CartStateContext = createContext<CartState | undefined>(undefined);
const CartDispatchContext = createContext<React.Dispatch<Action> | undefined>(
    undefined
);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(cartReducer, {
        items: {},
        total: 0,
        discount: {
            discountAmount: 0,
            isApplied: false,
            couponCode: null,
            isValid: false,
        }
    });

    useEffect(() => {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) {
            try {
                const parsed = JSON.parse(saved) as CartState;
                dispatch({ type: 'SET_CART', payload: parsed });
            } catch {
                console.warn('Failed to load cart from localStorage');
            }
        }
    }, []);

    return (
        <CartStateContext.Provider value={state}>
            <CartDispatchContext.Provider value={dispatch}>
                {children}
            </CartDispatchContext.Provider>
        </CartStateContext.Provider>
    );
};

// Hooks
export const useCart = () => {
    const context = useContext(CartStateContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const useCartDispatch = () => {
    const context = useContext(CartDispatchContext);
    if (context === undefined) {
        throw new Error('useCartDispatch must be used within a CartProvider');
    }
    return context;
};
