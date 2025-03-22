"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import MenuCard from "./Menucard"
// import { useCartContext } from './CartContext';
// import { useNavigate } from 'react-router-dom';
import "./Canteenmenu.css"
import logo from './images/LOGO.jpg';

// Menu data
const menuItems = {
    breakfast: [
        {
            id: 1,
            name: "Classic Breakfast",
            description: "Eggs, bacon, toast, and hash browns",
            price: 5.99,
            image: logo,
            tags: ["Popular", "Protein"],
            available: true,
        },
        {
            id: 2,
            name: "Avocado Toast",
            description: "Whole grain toast with avocado, cherry tomatoes, and feta",
            price: 4.5,
            // image: "/placeholder.svg?height=200&width=300",
            image: logo,
            tags: ["Vegetarian", "Healthy"],
            available: true,
        },
        {
            id: 3,
            name: "Pancake Stack",
            description: "Fluffy pancakes with maple syrup and fresh berries",
            price: 4.99,
            // image: "/placeholder.svg?height=200&width=300",
            image: logo,
            tags: ["Sweet", "Popular"],
            available: true,
        },
        {
            id: 4,
            name: "Breakfast Burrito",
            description: "Scrambled eggs, cheese, beans, and salsa in a tortilla wrap",
            price: 5.5,
            // image: "/placeholder.svg?height=200&width=300",
            image: logo,
            tags: ["Protein", "Filling"],
            available: true,
        },
    ],
    lunch: [
        {
            id: 5,
            name: "Chicken Caesar Salad",
            description: "Grilled chicken, romaine lettuce, croutons, and Caesar dressing",
            price: 7.99,
            // image: "/placeholder.svg?height=200&width=300",
            image: logo,
            tags: ["Healthy", "Protein"],
            available: true,
        },
        {
            id: 6,
            name: "Veggie Burger",
            description: "Plant-based patty with lettuce, tomato, and special sauce",
            price: 6.5,
            // image: "/placeholder.svg?height=200&width=300",
            image: logo,
            tags: ["Vegetarian", "Popular"],
            available: true,
        },
        {
            id: 7,
            name: "Margherita Pizza",
            description: "Classic pizza with tomato sauce, mozzarella, and basil",
            price: 8.99,
            // image: "/placeholder.svg?height=200&width=300",
            image: logo,
            tags: ["Vegetarian", "Popular"],
            available: false,
        },
        {
            id: 8,
            name: "Chicken Wrap",
            description: "Grilled chicken, mixed greens, and honey mustard in a wrap",
            price: 6.99,
            // image: "/placeholder.svg?height=200&width=300",
            image: logo,
            tags: ["Protein", "Quick"],
            available: true,
        },
    ],
    dinner: [
        {
            id: 9,
            name: "Spaghetti Bolognese",
            description: "Pasta with rich meat sauce and parmesan cheese",
            price: 9.99,
            // image: "/placeholder.svg?height=200&width=300",
            image: logo,
            tags: ["Popular", "Filling"],
            available: true,
        },
        {
            id: 10,
            name: "Grilled Salmon",
            description: "Fresh salmon with lemon butter sauce and seasonal vegetables",
            price: 12.99,
            // image: "/placeholder.svg?height=200&width=300",
            image: logo,
            tags: ["Healthy", "Protein"],
            available: true,
        },
        {
            id: 11,
            name: "Vegetable Stir Fry",
            description: "Mixed vegetables and tofu in a savory sauce with rice",
            price: 8.5,
            // image: "/placeholder.svg?height=200&width=300",
            image: logo,
            tags: ["Vegetarian", "Healthy"],
            available: true,
        },
        {
            id: 12,
            name: "Beef Burger",
            description: "Juicy beef patty with cheese, lettuce, tomato, and special sauce",
            price: 10.99,
            // image: "/placeholder.svg?height=200&width=300",
            image: logo,
            tags: ["Popular", "Filling"],
            available: true,
        },
    ],
}

export default function CanteenMenu() {
    // const { addItemToCart } = useCartContext();
    // const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState("breakfast")
    const [searchQuery, setSearchQuery] = useState("")
    const [filteredItems, setFilteredItems] = useState(menuItems[activeCategory])
    const [isLoaded, setIsLoaded] = useState(false)

    // const handleAddToCart = (item) => {
    //     addItemToCart(item);
    //     // navigate('/cart'); // Navigate to Cart page after adding item
    //   };

    useEffect(() => {
        // Simulate loading
        const timer = setTimeout(() => {
            setIsLoaded(true)
        }, 500)

        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        const items = menuItems[activeCategory]
        if (searchQuery) {
            setFilteredItems(
                items.filter(
                    (item) =>
                        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
                ),
            )
        } else {
            setFilteredItems(items)
        }
    }, [searchQuery, activeCategory])

    const getCategoryIcon = (category) => {
        switch (category) {
            case "breakfast":
                return <span className="icon">☕</span>
            case "lunch":
                return <span className="icon">🍴</span>
            case "dinner":
                return <span className="icon">🌙</span>
            default:
                return null
        }
    }

    return (
        <div className="container"> <br /> <br /> <br /> <br /> 
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="header"
            >
                <h1 className="title">Gehu Canteen</h1>
                <p className="subtitle">Delicious food for our busy students</p>
            </motion.div> <br /> 

            <div className="search-container">
                <div className="search-wrapper">
                    <span className="search-icon">🔍</span>
                    <input
                        type="text"
                        placeholder="Search menu..."
                        className="search-input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="tabs">
                <div className="tabs-list-container">
                    <div className="tabs-list">
                        <button
                            className={`tab-button ${activeCategory === "breakfast" ? "active" : ""}`}
                            onClick={() => setActiveCategory("breakfast")}
                        >
                            {getCategoryIcon("breakfast")}
                            <span className="tab-text">Breakfast</span>
                        </button>
                        <button
                            className={`tab-button ${activeCategory === "lunch" ? "active" : ""}`}
                            onClick={() => setActiveCategory("lunch")}
                        >
                            {getCategoryIcon("lunch")}
                            <span className="tab-text">Lunch</span>
                        </button>
                        <button
                            className={`tab-button ${activeCategory === "dinner" ? "active" : ""}`}
                            onClick={() => setActiveCategory("dinner")}
                        >
                            {getCategoryIcon("dinner")}
                            <span className="tab-text">Dinner</span>
                        </button>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="menu-grid">
                            {filteredItems.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{
                                        opacity: isLoaded ? 1 : 0,
                                        y: isLoaded ? 0 : 20,
                                    }}
                                    transition={{
                                        duration: 0.5,
                                        delay: isLoaded ? index * 0.1 : 0,
                                    }}
                                >
                                    <MenuCard item={item} />
                                </motion.div>
                            ))}
                        </div>

                        {filteredItems.length === 0 && (
                            <div className="no-results">
                                <p>No items found. Try a different search.</p>
                                <button className="clear-button" onClick={() => setSearchQuery("")}>
                                    Clear Search
                                </button>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
}

