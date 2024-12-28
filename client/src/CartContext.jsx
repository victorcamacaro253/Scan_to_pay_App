// CartContext.js
import React, { createContext, useState, useEffect, useMemo } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            const parsedCart = JSON.parse(storedCart);
            if (Array.isArray(parsedCart)) {
                setCart(parsedCart);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find(item => item.product_id === product.product_id);
            if (existingProduct) {
                return prevCart.map(item =>
                    item.product_id === product.product_id
                        ? { ...item, quantity: item.quantity + product.quantity }
                        : item
                );
            }
            return [...prevCart, { ...product, amount: product.amount * product.quantity }];
        });
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => {
            const product = prevCart.find(item => item.product_id === productId);
            if (product && product.quantity > 1) {
                return prevCart.map(item =>
                    item.product_id === productId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                );
            }
            return prevCart.filter(item => item.product_id !== productId);
        });
    };

    const clearCart = () => {
        setCart([]);
    };

    const total = useMemo(() => {
        return cart.reduce((total, item) => total + item.amount * item.quantity, 0) / 100;
    }, [cart]);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, total }}>
            {children}
        </CartContext.Provider>
    );
};