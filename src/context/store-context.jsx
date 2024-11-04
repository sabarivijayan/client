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
        
    }
}