

"use client"

import { useState } from "react"
import { Minus, Plus } from "lucide-react"
import CanteenPaymentPage from "./Payment"
import "./Orderitems.css"
import logo from './images/LOGO.jpg';

// Update the menu items array to have more explicit categories
const menuItems = [
  {
    id: 1,
    name: "Veg Burger",
    price: 80,
    image: logo,
    category: "Breakfast",
    description: "Fresh vegetable patty with lettuce, tomato, and special sauce",
  },
  {
    id: 2,
    name: "Chicken Sandwich",
    price: 120,
    image: logo,
    category: "Breakfast",
    description: "Grilled chicken with mayo, lettuce and cheese",
  },
  {
    id: 3,
    name: "Masala Dosa",
    price: 90,
    image: logo,
    category: "Breakfast",
    description: "Crispy dosa with spicy potato filling and chutneys",
  },
  {
    id: 4,
    name: "Cold Coffee",
    price: 60,
    image: logo,
    category: "Beverages",
    description: "Chilled coffee with ice cream",
  },
  {
    id: 5,
    name: "Veg Fried Rice",
    price: 100,
    image: logo,
    category: "Lunch",
    description: "Stir-fried rice with mixed vegetables",
  },
  {
    id: 6,
    name: "Chocolate Brownie",
    price: 70,
    image: logo,
    category: "Desserts",
    description: "Warm chocolate brownie with chocolate sauce",
  },
  {
    id: 7,
    name: "Paneer Butter Masala",
    price: 140,
    image: logo,
    category: "Lunch",
    description: "Cottage cheese cubes in rich tomato gravy",
  },
  {
    id: 8,
    name: "Chicken Biryani",
    price: 160,
    image: logo,
    category: "Dinner",
    description: "Fragrant rice cooked with chicken and aromatic spices",
  },
  {
    id: 9,
    name: "Veg Noodles",
    price: 110,
    image: logo,
    category: "Dinner",
    description: "Stir-fried noodles with mixed vegetables",
  },
  {
    id: 10,
    name: "Fresh Lime Soda",
    price: 50,
    image: logo,
    category: "Beverages",
    description: "Refreshing lime soda with mint leaves",
  },
]

// Define the categories we want to display
const categories = ["All", "Breakfast", "Lunch", "Dinner", "Beverages", "Desserts"]

export default function CanteenOrderItems() {
  const [cart, setCart] = useState([])
  const [showPayment, setShowPayment] = useState(false)
  const [activeCategory, setActiveCategory] = useState("All")

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.item.id === item.id)
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.item.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
        )
      } else {
        return [...prevCart, { item, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (itemId) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.item.id === itemId)
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((cartItem) =>
          cartItem.item.id === itemId ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem,
        )
      } else {
        return prevCart.filter((cartItem) => cartItem.item.id !== itemId)
      }
    })
  }

  const getTotalPrice = () => {
    return cart.reduce((total, cartItem) => total + cartItem.item.price * cartItem.quantity, 0)
  }

  const handlePlaceOrder = () => {
    setShowPayment(true)
  }

  const handleBackToOrder = () => {
    setShowPayment(false)
  }

  const handleCategoryChange = (category) => {
    setActiveCategory(category)
  }

  // Filter menu items based on active category
  const filteredMenuItems =
    activeCategory === "All" ? menuItems : menuItems.filter((item) => item.category === activeCategory)

  if (showPayment) {
    return <CanteenPaymentPage cart={cart} totalPrice={getTotalPrice()} onBack={handleBackToOrder} />
  }

  return (
    <div className="canteen-order-grid">
      <div className="canteen-menu-section">
        <h1 className="canteen-section-title">Menu Items</h1>

        {/* Category filter buttons */}
        <div className="canteen-category-filters">
          {categories.map((category) => (
            <button
              key={category}
              className={`canteen-category-btn ${activeCategory === category ? "active" : ""}`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu items grid */}
        <div className="canteen-menu-grid">
          {filteredMenuItems.map((item) => (
            <div key={item.id} className="canteen-menu-card">
              <div className="canteen-menu-card-content">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="canteen-menu-image"
                />
                <div className="canteen-menu-details">
                  <h3 className="canteen-menu-item-title">{item.name}</h3>
                  <p className="canteen-menu-item-desc">{item.description}</p>
                  <div className="canteen-menu-item-footer">
                    <span className="canteen-menu-item-price">₹{item.price}</span>
                    <button className="canteen-add-btn" onClick={() => addToCart(item)}>
                      Add to Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="canteen-cart-section">
        <div className="canteen-cart-card">
          <div className="canteen-cart-content">
            <h2 className="canteen-cart-title">Your Order</h2>
            {cart.length === 0 ? (
              <p className="canteen-cart-empty">Your order is empty</p>
            ) : (
              <>
                <div className="canteen-cart-items">
                  {cart.map((cartItem) => (
                    <div key={cartItem.item.id} className="canteen-cart-item">
                      <div className="canteen-cart-item-info">
                        <h4 className="canteen-cart-item-name">{cartItem.item.name}</h4>
                        <p className="canteen-cart-item-price">₹{cartItem.item.price} each</p>
                      </div>
                      <div className="canteen-cart-item-quantity">
                        <button className="canteen-quantity-btn" onClick={() => removeFromCart(cartItem.item.id)}>
                          <Minus className="canteen-icon-small" />
                          <span className="canteen-sr-only">Remove</span>
                        </button>
                        <span className="canteen-quantity-value">{cartItem.quantity}</span>
                        <button className="canteen-quantity-btn" onClick={() => addToCart(cartItem.item)}>
                          <Plus className="canteen-icon-small" />
                          <span className="canteen-sr-only">Add</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="canteen-cart-separator"></div>
                <div className="canteen-cart-summary">
                  <div className="canteen-cart-row">
                    <span>Subtotal</span>
                    <span>₹{getTotalPrice()}</span>
                  </div>
                  <div className="canteen-cart-row canteen-cart-taxes">
                    <span>Taxes</span>
                    <span>₹{Math.round(getTotalPrice() * 0.05)}</span>
                  </div>
                  <div className="canteen-cart-separator"></div>
                  <div className="canteen-cart-row canteen-cart-total">
                    <span>Total</span>
                    <span>₹{getTotalPrice() + Math.round(getTotalPrice() * 0.05)}</span>
                  </div>
                </div>
                <button className="canteen-place-order-btn" onClick={handlePlaceOrder} disabled={cart.length === 0}>
                  Place Order
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}


