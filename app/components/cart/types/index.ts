export interface Cart {
    [productId: number]: {
        quantity: number;
        price: number;
    }
}