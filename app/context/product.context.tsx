import React, {
    createContext,
    useContext,
    useReducer,
    useEffect,
    ReactNode,
} from 'react';
import { callExternalApi } from '../actions';

export type ProductItem = {
    id: number;
    category: string;
    name: string;
    price: number; // product price
    finalPrice: number; // after discount
    quantity: number;
    image: {
        thumbnail: string;
        desktop: string;
        mobile: string;
        tablet: string;
    }
};

type ProductState = {
    products: ProductItem[]
    isLoading: boolean;
    isFailed: boolean;
}

type Action =
    { type: 'FETCH_PRODUCTS_LOADING'; payload: {} }
    | { type: 'FETCH_PRODUCTS'; payload: { data: ProductItem[] } }

const LOCAL_STORAGE_KEY = 'app_products';

const productReducer = (state: ProductState, action: Action): ProductState => {
    let newState: ProductState = { products: [], isFailed: false, isLoading: true };
    switch (action.type) {
        case 'FETCH_PRODUCTS_LOADING': {
            newState = {
                products: [],
                isFailed: false,
                isLoading: true,
            }
            break;
        }
        case 'FETCH_PRODUCTS': {
            newState = {
                products: action.payload.data,
                isFailed: false,
                isLoading: false,
            }
            break;
        }

        default:
            return state;
    }

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState));
    return newState;
};

const ProductStateContext = createContext<ProductState | undefined>(undefined);
const ProductDispatchContext = createContext<React.Dispatch<Action> | undefined>(
    undefined
);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(productReducer, {
        products: [],
        isFailed: false,
        isLoading: true
    });

    useEffect(() => {
        dispatch({ type: "FETCH_PRODUCTS_LOADING", payload: {} });
        (async function () {
            const result = await callExternalApi('api/product', "get");
            console.info('result--->', result);
            if (result.length) {
                dispatch({ type: "FETCH_PRODUCTS", payload: { data: result } })
            }
        })();
    }, [])

    return (
        <ProductStateContext.Provider value={state}>
            <ProductDispatchContext.Provider value={dispatch}>
                {children}
            </ProductDispatchContext.Provider>
        </ProductStateContext.Provider>
    );
};

// Hooks
export const useProduct = () => {
    const context = useContext(ProductStateContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const useProductDispatch = () => {
    const context = useContext(ProductDispatchContext);
    if (context === undefined) {
        throw new Error('useCartDispatch must be used within a CartProvider');
    }
    return context;
};
