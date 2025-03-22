"use client"

import { useState, useEffect } from "react"
import "./Homepage.css"
import logo from './images/LOGO.jpg';
import third from './images/desret.png';
import four from './images/beeverage.png';

export default function CollegeCanteenLanding() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [activeSection, setActiveSection] = useState("home")

    // Scroll animation effect
    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll("section")
            const scrollPosition = window.scrollY + 300

            sections.forEach((section) => {
                if (section.offsetTop <= scrollPosition && section.offsetTop + section.offsetHeight > scrollPosition) {
                    setActiveSection(section.id)
                }
            })

            // Reveal elements on scroll
            const reveals = document.querySelectorAll(".reveal")
            reveals.forEach((element) => {
                const windowHeight = window.innerHeight
                const elementTop = element.getBoundingClientRect().top
                const elementVisible = 150

                if (elementTop < windowHeight - elementVisible) {
                    element.classList.add("active")
                }
            })
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const menuItems = [
        { name: "Breakfast Specials", price: "$3.99", image: third },
        { name: "Lunch Combo", price: "$5.99", image: four },
        { name: "Snack Platter", price: "$4.50", image: third },
        { name: "Coffee & Pastry", price: "$3.25", image: four },
        { name: "Healthy Salad Bowl", price: "$4.99", image: third },
        { name: "Pizza Slice", price: "$2.50", image: four },
    ]

    const testimonials = [
        {
            id: 1,
            name: "Alex Johnson",
            role: "Computer Science Student",
            text: "The canteen has been my go-to spot between classes. Great food and even better prices!",
            avatar: "/placeholder.svg?height=50&width=50",
        },
        {
            id: 2,
            name: "Sarah Williams",
            role: "Engineering Major",
            text: "I love the variety of options available. The staff is always friendly and accommodating.",
            avatar: logo,
        },
        {
            id: 3,
            name: "Michael Chen",
            role: "Business Student",
            text: "The breakfast specials are amazing! Perfect way to start a busy day of classes.",
            avatar: logo,
        },
    ]

    return (
        <div className="canteen-app">
            {/* Header */}
            <header className="header">
                <div className="logo">
                    <span className="logo-text">
                        Gehu<span className="highlight">Canteen</span>
                    </span>
                </div>
                <div className={`mobile-menu-button ${isMenuOpen ? "active" : ""}`} onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <nav className={`nav-links ${isMenuOpen ? "open" : ""}`}>
                    <a href="#home" className={activeSection === "home" ? "active" : ""}>
                        Home
                    </a>
                    <a href="#menu" className={activeSection === "menu" ? "active" : ""}>
                        Menu
                    </a>
                    <a href="#features" className={activeSection === "features" ? "active" : ""}>
                        Features
                    </a>
                    <a href="#testimonials" className={activeSection === "testimonials" ? "active" : ""}>
                        Testimonials
                    </a>
                    <a href="#location" className={activeSection === "location" ? "active" : ""}>
                        Location
                    </a>
                    <a href="/login"><button className="order-button">Order Now</button></a>
                </nav>
            </header> <br /> <br /> <br />

            {/* Hero Section */}
            <section id="home" className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title reveal"> <br />
                        Delicious Food <br />
                        <span className="highlight">For Campus Life</span>
                    </h1>
                    <p className="hero-subtitle reveal">Fueling your education with quality meals at affordable prices</p>
                    <div className="hero-buttons reveal">
                        <a href="/Menu"><button className="primary-button">View Menu</button></a>
                        <button className="secondary-button">Special Offers</button>
                    </div>
                </div>
                <div className="hero-image reveal">
                    <div className="image-container">
                        <img src={third} alt="Delicious canteen food" />
                        <div className="floating-badge">
                            <span>
                                Student
                                <br />
                                Discount
                                <br />
                                20%
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Menu Highlights */}
            <section id="menu" className="menu-section">
                <div className="section-header reveal">
                    <h2>
                        Our Popular <span className="highlight">Menu</span>
                    </h2>
                    <p>Explore our most loved dishes that keep students coming back</p>
                </div>
                <div className="menu-grid reveal">
                    {menuItems.map((item, index) => (
                        <div className="menu-item" key={index}>
                            <div className="menu-item-image">
                                <img src={item.image || "/placeholder.svg"} alt={item.name} />
                            </div>
                            <div className="menu-item-info">
                                <h3>{item.name}</h3>
                                <p className="price">{item.price}</p>
                                <a href="/Order"><button className="add-to-cart">Order Now</button></a>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="view-all-container reveal">
                    <a href="/Menu"><button className="view-all-button">View Full Menu</button></a>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="features-section">
                <div className="section-header reveal">
                    <h2>
                        Why Choose <span className="highlight">Campus</span>Eats?
                    </h2>
                    <p>We're more than just a canteen - we're part of your campus experience</p>
                </div>
                <div className="features-grid reveal">
                    <div className="feature-card">
                        <div className="feature-icon">
                            <svg
                                viewBox="0 0 24 24"
                                width="40"
                                height="40"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                            </svg>
                        </div>
                        <h3>Quality Ingredients</h3>
                        <p>We use fresh, locally-sourced ingredients for all our meals</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <svg
                                viewBox="0 0 24 24"
                                width="40"
                                height="40"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                        </div>
                        <h3>Quick Service</h3>
                        <p>Get your food fast, even during the busiest lunch hours</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <svg
                                viewBox="0 0 24 24"
                                width="40"
                                height="40"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                        </div>
                        <h3>Student Discounts</h3>
                        <p>Special pricing and meal plans designed for student budgets</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <svg
                                viewBox="0 0 24 24"
                                width="40"
                                height="40"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                        </div>
                        <h3>Dietary Options</h3>
                        <p>Vegetarian, vegan, and gluten-free options available daily</p>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section id="testimonials" className="testimonials-section">
                <div className="section-header reveal">
                    <h2>
                        What Students <span className="highlight">Say</span>
                    </h2>
                    <p>Hear from our regular customers about their experiences</p>
                </div>
                <div className="testimonials-container reveal">
                    {testimonials.map((testimonial) => (
                        <div className="testimonial-card" key={testimonial.id}>
                            <div className="quote-icon">
                                <svg
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                                    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                                </svg>
                            </div>
                            <p className="testimonial-text">{testimonial.text}</p>
                            <div className="testimonial-author">
                                <img src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} className="author-avatar" />
                                <div className="author-info">
                                    <h4>{testimonial.name}</h4>
                                    <p>{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Location Section */}
            <section id="location" className="location-section">
                <div className="section-header reveal">
                    <h2>
                        Find <span className="highlight">Us</span>
                    </h2>
                    <p>Conveniently located in the heart of campus</p>
                </div>
                <div className="location-container reveal">
                    <div className="map-container">
                        {/* <img src="/placeholder.svg?height=300&width=600" alt="Map location" className="map-image" /> */}
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3476.8262588442003!2d79.52827157531817!3d29.375375975267342!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a0987622d2a7f3%3A0x8a1cf97c55e9e156!2sGraphic%20Era%20Hill%20University%20-%20Bhimtal%20Campus!5e0!3m2!1sen!2sin!4v1742633631649!5m2!1sen!2sin"
                            width="600"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Google Map"
                        ></iframe>
                    </div>
                    <div className="location-info">
                        <div className="info-item">
                            <div className="info-icon">
                                <svg
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                    <circle cx="12" cy="10" r="3"></circle>
                                </svg>
                            </div>
                            <div>
                                <h3>Address</h3>
                                <p>Graphic Era Bhimtal Campus</p>
                            </div>
                        </div>
                        <div className="info-item">
                            <div className="info-icon">
                                <svg
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                </svg>
                            </div>
                            <div>
                                <h3>Hours</h3>
                                <p>Monday-Sunday: 7:30 AM - 10:00 PM</p>
                                {/* <p>Saturday: 9:00 AM - 5:00 PM</p> */}
                                {/* <p>Sunday: Closed</p> */}
                            </div>
                        </div>
                        <div className="info-item">
                            <div className="info-icon">
                                <svg
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                </svg>
                            </div>
                            <div>
                                <h3>Contact</h3>
                                <p>Phone: 1234567890</p>
                                <p>Email: gehucanteen@college.edu</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-logo">
                        <span className="logo-text">
                            Gehu<span className="highlight">Canteen</span>
                        </span>
                        <p>Fueling minds, one meal at a time</p>
                    </div>
                    <div className="footer-links">
                        <div className="footer-column">
                            <h3>Quick Links</h3>
                            <a href="#home">Home</a>
                            <a href="#menu">Menu</a>
                            <a href="#features">Features</a>
                            <a href="#testimonials">Testimonials</a>
                            <a href="#location">Location</a>
                        </div>
                        <div className="footer-column">
                            <h3>Information</h3>
                            <a href="#">About Us</a>
                            <a href="#">Meal Plans</a>
                            <a href="#">Catering</a>
                            {/* <a href="#">Careers</a> */}
                            {/* <a href="#">FAQ</a> */}
                        </div>
                        <div className="footer-column">
                            <h3>Connect With Us</h3>
                            <div className="social-icons">
                                <a href="#" className="social-icon">
                                    <svg
                                        viewBox="0 0 24 24"
                                        width="24"
                                        height="24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                    </svg>
                                </a>
                                <a href="#" className="social-icon">
                                    <svg
                                        viewBox="0 0 24 24"
                                        width="24"
                                        height="24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                                    </svg>
                                </a>
                                <a href="#" className="social-icon">
                                    <svg
                                        viewBox="0 0 24 24"
                                        width="24"
                                        height="24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                    </svg>
                                </a>
                            </div>
                            {/* <div className="newsletter">
                                <h4>Subscribe to our newsletter</h4>
                                <div className="newsletter-form">
                                    <input type="email" placeholder="Your email" />
                                    <button>Subscribe</button>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} GehuCanteen. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}

