import { CartItem } from "@/app/context/cart.context";
import { ProductItem } from "@/app/context/product.context";

export interface OrderDetailsType {
    items: Pick<CartItem, 'id' | 'quantity'>[],
    products: ProductItem[];
    couponCode?: string | null;
    discountAmount?: number;
    orderedItems?: {
        [id: string]: CartItem
    },
    total: number
}