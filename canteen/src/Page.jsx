// import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import CanteenOrderItems from "./Orderitems"
// import { useCartContext } from './CartContext';
import "./Page.css"

export default function CanteenOrderPage() {
  // const { cartItems, removeItemFromCart } = useCartContext();
  return (
    <div className="canteen-container">
      <header className="canteen-header">
        <div className="canteen-header-content">
          <div className="canteen-logo">
            <ShoppingCart className="canteen-logo-icon" />
            GehuCanteen
          </div>
          <nav className="canteen-nav">
            <a href="/Menu" className="canteen-nav-link">
              Menu
            </a>
            <a href="/Order" className="canteen-nav-link">
              My Orders
            </a>
            <a href="/login"><button className="canteen-login-btn">Login</button></a>
          </nav>
        </div>
      </header>
      <main className="canteen-main">
        <CanteenOrderItems />
      </main>
      <footer className="canteen-footer">
        <div className="canteen-footer-content">
          <p className="canteen-copyright">&copy; {new Date().getFullYear()} GehuCanteen. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

