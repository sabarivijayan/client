"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./cart.css";
import { useRouter } from "next/navigation";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [summary, setSummary] = useState({
    total: 0,
    discount: 0,
    payable: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      setIsLoading(true);
      const token = Cookies.get("token");
      if (!token) {
        router.push("/signin");
        return;
      }

      const cartResponse = await axios.post(
        "http://localhost:4000/api/cart/get",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!cartResponse.data.success)
        throw new Error("Failed to fetch cart data");
      const cartData = cartResponse.data.cartData;

      const productsResponse = await axios.get(
        "http://localhost:4000/api/product/list",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!productsResponse.data.success)
        throw new Error("Failed to fetch products");
      const products = productsResponse.data.data;

      const cartItemsWithDetails = Object.entries(cartData)
        .map(([productId, quantity]) => {
          const product = products.find((p) => p._id === productId);
          if (!product) return null;
          return { ...product, quantity };
        })
        .filter((item) => item !== null && item.quantity > 0);

      setCartItems(cartItemsWithDetails);
      fetchDiscountedTotal();
    } catch (error) {
      console.error("Error fetching cart:", error);
      if (error.response?.status === 401) router.push("/signin");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDiscountedTotal = async () => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        router.push("/signin");
        return;
      }

      const response = await axios.post(
        "http://localhost:4000/api/cart/discounted-total",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setSummary({
          total: response.data.total,
          discount: response.data.discount || 0,
          payable: response.data.payable || response.data.total,
        });
      }
    } catch (error) {
      console.error("Error fetching discounted total:", error);
    }
  };

  const handleQuantityChange = async (itemId, change) => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        router.push("/signin");
        return;
      }

      const endpoint = change === 1 ? "add" : "remove";
      const response = await axios.post(
        `http://localhost:4000/api/cart/${endpoint}`,
        { itemId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        const updatedItems = cartItems
          .map((item) => {
            if (item._id === itemId) {
              const newQuantity = item.quantity + change;
              return newQuantity > 0
                ? { ...item, quantity: newQuantity }
                : null;
            }
            return item;
          })
          .filter(Boolean);

        setCartItems(updatedItems);
        fetchDiscountedTotal();
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      if (error.response?.status === 401) router.push("/signin");
    }
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading">Loading your cart...</div>
      </div>
    );
  }

  return (
    <div>
      <section className="breadcrumb-section">
        <div className="breadcrumb">
          <a href="/">Home </a>
          <a href="/cart">Cart</a>
        </div>
      </section>

      <div className="product-count">
        <h2>{cartItems.length} Items</h2>
      </div>

      <div className="cart-container">
        <div className="product-list">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty</p>
              <button
                className="continue-shopping"
                onClick={() => router.push("/home")}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div className="product-container" key={item._id}>
                <div className="product-item">
                  <img
                    src={item.image}
                    alt={item.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/placeholder-image.jpg";
                    }}
                  />
                  <div className="product-details">
                    <h3>{item.name}</h3>
                    <p className="description">{item.description}</p>
                    <p className="price">
                      ${item.price.toFixed(2)}
                      {item.discount > 0 && (
                        <span className="discount-tag">
                          Save ${item.discount.toFixed(2)}
                        </span>
                      )}
                    </p>
                    <div className="quantity-controls">
                      <button
                        className="qty-btn"
                        onClick={() => handleQuantityChange(item._id, -1)}
                      >
                        -
                      </button>
                      <span className="quantity">Qty: {item.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() => handleQuantityChange(item._id, 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="product-actions">
                    <button
                      className="remove-btn"
                      onClick={() =>
                        handleQuantityChange(item._id, -item.quantity)
                      }
                    >
                      <img
                        className="wishlist-icon"
                        src="/icons/delete.png"
                        alt="Remove"
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="order-summary">
          <h3>Order Details</h3>
          <div className="summary-item">
            <span>Bag total</span>
            <span>${summary.total?.toFixed(2)}</span>
          </div>
          <div className="summary-item">
            <span>Discount</span>
            <span className="discount">${summary.discount?.toFixed(2)}</span>
          </div>
          <div className="summary-item total">
            <span>Total</span>
            <span>${summary.payable.toFixed(2)}</span>
          </div>
          {summary.discountNames?.length > 0 && (
            <div className="applied-discounts">
              <h4>Applied Discounts:</h4>
              <ul>
                {summary.discountNames.map((appliedDiscounts, index) => (
                  <li key={index}>{appliedDiscounts}</li>
                ))}
              </ul>
            </div>
          )}
          
          
          {summary.discount > 0 && (
            <p className="congrats-message">
              Congratulations! You've Saved ${summary.discount?.toFixed(2)}{" "}
              today!
            </p>
          )}
          <button
            className="checkout-btn"
            onClick={() => router.push("/checkout")}
            disabled={cartItems.length === 0}
          >
            Go to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
