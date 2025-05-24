import { ShoppingCart } from 'lucide-react';
import './index.css';

export const EmptyCart = () => (
    <div className="empty-cart">
        <ShoppingCart size={80} stroke="#aaa" />
        <p>Your added items will appear here</p>
    </div>
);
