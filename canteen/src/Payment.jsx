"use client"

import { useState } from "react"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import "./Payment.css"

export default function CanteenPaymentPage({ cart, totalPrice, onBack }) {
  const [paymentMethod, setPaymentMethod] = useState("upi")
  const [orderPlaced, setOrderPlaced] = useState(false)

  const handlePaymentSubmit = () => {
    // In a real app, this would process the payment
    setOrderPlaced(true)
  }

  if (orderPlaced) {
    return (
      <div className="canteen-success-container">
        <div className="canteen-success-content">
          <CheckCircle2 className="canteen-success-icon" />
          <h1 className="canteen-success-title">Order Placed Successfully!</h1>
          <p className="canteen-success-message">
            Your order has been placed and will be ready for pickup in approximately 15-20 minutes.
          </p>
          <p className="canteen-order-id">Order ID: #{Math.floor(Math.random() * 10000)}</p>
          <button className="canteen-new-order-btn" onClick={() => window.location.reload()}>
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
            <button className="canteen-complete-payment-btn" onClick={handlePaymentSubmit}>
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
    </div>
  )
}

