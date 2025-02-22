import React, { useState } from "react";
import "./MyCart.css";

const MyCart = () => {
  const [cart, setCart] = useState([
    { id: 1, name: "Chole Bhature", price: 40, quantity: 1, image: "chole.jpg" },
    { id: 2, name: "Pav Bhaji", price: 20, quantity: 4, image: "pav.jpg" },
    { id: 3, name: " Bhaji", price: 20, quantity: 4, image: "pav.jpg" },
  ]);

  const handleRemove = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const handleQuantityChange = (id, change) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + change }
          : item
      )
    );
  };

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} className="item-image" />
            <div className="item-details">
              <h3>{item.name}</h3>
              <p>Price: {item.price}</p>
              <div className="quantity-controls">
                <button className="decrease" onClick={() => handleQuantityChange(item.id, -1)} disabled={item.quantity <= 1}>-</button>
                <span>{item.quantity}</span>
                <button className="increase" onClick={() => handleQuantityChange(item.id, 1)}>+</button>
              </div>
              <p>Amount: {item.price * item.quantity}</p>
            </div>
            <button className="delete" onClick={() => handleRemove(item.id)}>🗑️</button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h2>Total: {totalAmount}</h2>
        <button className="checkout">PayPal</button>
        <button className="checkout">Debit or Credit Card</button>
        <button className="checkout">Pay Cash On Delivery</button>
      </div>
    </div>
  );
};

export default MyCart;
