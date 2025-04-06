"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import "./Payment.css"

export default function CanteenPaymentPage({ cart, totalPrice, onBack }) {
  const [paymentMethod, setPaymentMethod] = useState("upi")
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [message, setMessage] = useState(""); // State to hold the message
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const navigate = useNavigate(); // Correctly defined here

  let result;
  let OrderId;
  let User = JSON.parse(localStorage.getItem("user"));


  const handlePaymentSubmit = async () => {
    // In a real app, this would process the payment

    const orderData = {
      customerName: User.username, // You can replace this with actual user data (from user session, etc.)
      customerEmail: "o102@gehu.ac.in", // Replace with actual user contact info
      paymentMethod: paymentMethod,
      cart: cart.map((cartItem) => ({
        id: cartItem.item.id,     // Item ID
        name: cartItem.item.name, // Item Name
        quantity: cartItem.quantity,
      })),
      totalPrice: totalPrice,
      taxes: Math.round(totalPrice * 0.05),
      totalAmount: totalPrice + Math.round(totalPrice * 0.05),
    }

    try {
      const response = await fetch('https://gehu-canteen-n6r8-sagars-projects-0f20619e.vercel.app/save-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      // console.log('Order Data:', orderData);
      // localStorage.removeItem('confirmedOrderId');


      result = await response.json();

      // console.log(result);




      if (response.ok) {
        OrderId = result.orderId;


        // Successfully saved the order, now show the success page
      } else {
        // Handle the error case
        alert(result.message || "Something went wrong while placing the order.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("There was an error processing your payment.");
    }
  }

  useEffect(() => {

  // Set up the interval to check every 10 seconds
  const interval = setInterval(async () => {

    if (!OrderId)
    console.log("no order id");
    // console.log(OrderId);
    

    try {
      const response = await fetch(`https://gehu-canteen-n6r8-sagars-projects-0f20619e.vercel.app/orders/${OrderId}`);
      const order = await response.json();
      // console.log("Your placed order:",order);

      // console.log("Your order status:",order.status);
      


      

      if (order.status === "Confirmed") {
        setOrderPlaced(true);
        setMessage("");
        clearInterval(interval);
      } else if (order.status === "pending") {
        setMessage("Your order is still pending...");
      } else if (order.status === "rejected") {
        setMessage("Your order is rejected.");
        alert("Your order is rejected");
        clearInterval(interval);
        navigate('/');
      }
    } catch (error) {
      console.error("Error fetching order status:", error);
    }

  }, 10000); // 10 seconds

  // Clean up the interval on unmount
  return () => clearInterval(interval);
}, []);  // Add dependencies if necessary, like result.orderId


  
  

  





  if (orderPlaced) {
    return (
      <div className="canteen-success-container">
        <div className="canteen-success-content">
          <CheckCircle2 className="canteen-success-icon" />


          {/* <h1 className="canteen-success-title">
            {orderConfirmed ? "Order Confirmed!" : "Order Placed Successfully!"}
          </h1>
          <p className="canteen-success-message">
            {orderConfirmed
              ? "Your order has been confirmed and will be ready for pickup shortly."
              : "Your order has been placed and will be processed soon."}
          </p>
 */}



          <h1 className="canteen-success-title">Order Placed Successfully!</h1>
          <p className="canteen-success-message">
            Your order has been placed and will be ready for pickup in approximately 15-20 minutes.
          </p>
          <p className="canteen-order-id">Order ID: #{Math.floor(Math.random() * 10000)}</p>
          {/* <button className="canteen-new-order-btn" onClick={() => window.location.reload()}>
            Place Another Order
          </button> */}
          <button className="canteen-new-order-btn" onClick={() => {
            setOrderPlaced(false);
            localStorage.removeItem('confirmedOrderId');
            window.location.reload();  // Or reset cart state
          }}>
            Place Another Order
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="canteen-payment-grid">
      <div className="canteen-payment-options-section">
        <button className="canteen-back-btn" onClick={onBack}>
          <ArrowLeft className="canteen-back-icon" /> Back to Order
        </button>
        <div className="canteen-payment-card">
          <div className="canteen-payment-header">
            <h2 className="canteen-payment-title">Payment Options</h2>
            <p className="canteen-payment-subtitle">Choose your preferred payment method</p>
          </div>
          <div className="canteen-payment-content">
            <div className="canteen-payment-methods">
              <div className="canteen-payment-method-item">
                <input
                  type="radio"
                  id="upi"
                  name="paymentMethod"
                  value="upi"
                  checked={paymentMethod === "upi"}
                  onChange={() => setPaymentMethod("upi")}
                  className="canteen-radio-input"
                />
                <label htmlFor="upi" className="canteen-payment-method-label">
                  <div className="canteen-payment-method-name">UPI</div>
                  <div className="canteen-payment-method-desc">Pay using any UPI app</div>
                </label>
              </div>
              <div className="canteen-payment-method-item">
                <input
                  type="radio"
                  id="card"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                  className="canteen-radio-input"
                />
                <label htmlFor="card" className="canteen-payment-method-label">
                  <div className="canteen-payment-method-name">Credit/Debit Card</div>
                  <div className="canteen-payment-method-desc">Pay using your card</div>
                </label>
              </div>
              <div className="canteen-payment-method-item">
                <input
                  type="radio"
                  id="wallet"
                  name="paymentMethod"
                  value="wallet"
                  checked={paymentMethod === "wallet"}
                  onChange={() => setPaymentMethod("wallet")}
                  className="canteen-radio-input"
                />
                <label htmlFor="wallet" className="canteen-payment-method-label">
                  <div className="canteen-payment-method-name">Campus Wallet</div>
                  <div className="canteen-payment-method-desc">Pay using your campus wallet balance</div>
                </label>
              </div>
              <div className="canteen-payment-method-item">
                <input
                  type="radio"
                  id="cash"
                  name="paymentMethod"
                  value="cash"
                  checked={paymentMethod === "cash"}
                  onChange={() => setPaymentMethod("cash")}
                  className="canteen-radio-input"
                />
                <label htmlFor="cash" className="canteen-payment-method-label">
                  <div className="canteen-payment-method-name">Cash on Delivery</div>
                  <div className="canteen-payment-method-desc">Pay when you pick up your order</div>
                </label>
              </div>
            </div>
          </div>
          <div className="canteen-payment-footer">
            <button className="canteen-complete-payment-btn" onClick={handlePaymentSubmit} >
              Complete Payment
            </button>
          </div>
        </div>
      </div>
      <div className="canteen-order-summary-section">
        <div className="canteen-summary-card">
          <div className="canteen-summary-header">
            <h2 className="canteen-summary-title">Order Summary</h2>
          </div>
          <div className="canteen-summary-content">
            <div className="canteen-summary-items">
              {cart.map((cartItem) => (
                <div key={cartItem.item.id} className="canteen-summary-item">
                  <span>
                    {cartItem.item.name} × {cartItem.quantity}
                  </span>
                  <span>₹{cartItem.item.price * cartItem.quantity}</span>
                </div>
              ))}
            </div>
            <div className="canteen-summary-separator"></div>
            <div className="canteen-summary-totals">
              <div className="canteen-summary-row">
                <span>Subtotal</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="canteen-summary-row canteen-summary-taxes">
                <span>Taxes (5%)</span>
                <span>₹{Math.round(totalPrice * 0.05)}</span>
              </div>
              <div className="canteen-summary-separator"></div>
              <div className="canteen-summary-row canteen-summary-total">
                <span>Total</span>
                <span>₹{totalPrice + Math.round(totalPrice * 0.05)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {message && <div className="canteen-message">{message}</div>}
    </div>
  )
}

