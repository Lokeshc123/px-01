import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../components/navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import CartItem from '../components/CartItem/CartItem';
import { UserContext } from '../context/Context';

const CartPage = () => {
    const { cart, setCart } = useContext(UserContext);
    const navigate = useNavigate();
    const [subtotal, setSubtotal] = useState(0.0);
    const [discount, setDiscount] = useState(0.0);
    const [estimatedShipping, setEstimatedShipping] = useState(0.0);
    const [total, setTotal] = useState(0.0);
    const handleRemoveItem = (itemId) => {
        setCart(cart.filter((item) => item._id !== itemId)); // Filter based on ID
    }

    const handleQuantityChange = (itemId, change) => {
        const updatedItems = cart.map((item) => {
            if (item.id === itemId) {
                return { ...item, quantity: Math.max(item.quantity + change, 1) };
            }
            return item;
        });
        setCart(updatedItems);

    };


    useEffect(() => {
        let subtotal = 0;
        cart.forEach((item) => (subtotal += item.price * item.quantity));
        setSubtotal(subtotal);

        // Implement discount logic here (if applicable)
        setDiscount(0.0); // Replace with actual discount calculation

        // Set estimated shipping cost based on your logic
        setEstimatedShipping(5.0); // Replace with actual shipping cost calculation

        setTotal(subtotal - discount + estimatedShipping);
    }, [cart, discount, estimatedShipping]);

    return (
        <div>
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold md:text-3xl">Shopping Cart</h1>
                </div>
                <div id="cart-items" className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {cart.map((item) => (
                        <CartItem
                            key={item.id}
                            item={item}
                            onRemoveItem={handleRemoveItem}
                            onQuantityChange={handleQuantityChange}
                        />
                    ))}
                </div>

                <div className="flex flex-col md:flex-row justify-between mt-8 border-t border-gray-200 pt-4">
                    <div className="flex flex-col space-y-2">
                        <p className="text-gray-700">Subtotal: $<span id="subtotal">{subtotal.toFixed(2)}</span></p>
                        <div id="discount-section" className={discount > 0 ? '' : 'hidden'}>
                            <p>Discount: $<span id="discount">{discount.toFixed(2)}</span></p>
                        </div>
                        <p>Estimated Shipping: $<span id="estimated-shipping">{estimatedShipping.toFixed(2)}</span></p>
                    </div>
                    <div className="text-right">
                        <p className="font-bold text-lg">Total: $<span id="total">{total.toFixed(2)}</span></p>
                    </div>
                </div>

                <div className="flex justify-between mt-4">
                    <button onClick={() => navigate('/')} className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-md " disabled={cart.length === 0}>
                        Continue Shopping
                    </button>
                    <button onClick={() => navigate(`/checkout`)} className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md " disabled={cart.length === 0}>
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
