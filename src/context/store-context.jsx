"use client"
import { createContext, useState, useEffect } from "react";
import axios from 'axios';


export const StoreContext = createContext(null);

const StoreContextProvider = (props) =>{
    const url = "http://localhost:4000"
    const [token, setToken] = useState({});
    const [cartItems, setCartItems] = useState([]);

    const addToCart = async (itemId) =>{
        if(!cartItems[itemId]){
            setCartItems((prev) => ({...prev, [itemId]: 1}));
        }
        else{
            setCartItems((prev)=>({ ...prev, [itemId]: prev[itemId] + 1}));
        }
        if(token){
            await axios.post(url + "/api/cart/add", {itemId}, {headers: {token}});
        }
    }

    const removeFromCart = async (itemId) =>{
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
        }
    }
    const loadCartData = async (token) => {
        const response = await axios.post(url + "/api/cart/get", {}, { headers: token });
        setCartItems(response.data.cartData);
    }
    const contextValue = {
        url,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        token,
        setToken,
        loadCartData,
        setCartItems,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}

export default StoreContextProvider;
