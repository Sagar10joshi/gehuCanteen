"use client"

import { useState, useEffect } from "react"
import "./Specialoffer.css"
import third from './images/desret.png';
import four from './images/beeverage.png';

export default function SpecialOffers() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [activeSection, setActiveSection] = useState("offers")
    const [countdown, setCountdown] = useState({
        days: 2,
        hours: 14,
        minutes: 35,
        seconds: 22,
    })

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

    // Countdown timer
    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prevCountdown) => {
                let { days, hours, minutes, seconds } = prevCountdown

                if (seconds > 0) {
                    seconds -= 1
                } else {
                    seconds = 59
                    if (minutes > 0) {
                        minutes -= 1
                    } else {
                        minutes = 59
                        if (hours > 0) {
                            hours -= 1
                        } else {
                            hours = 23
                            if (days > 0) {
                                days -= 1
                            } else {
                                // Reset countdown when it reaches zero
                                days = 2
                                hours = 14
                                minutes = 35
                                seconds = 22
                            }
                        }
                    }
                }

                return { days, hours, minutes, seconds }
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const featuredOffers = [
        {
            id: 1,
            title: "Student Meal Deal",
            description: "Any sandwich, chips, and drink for just $5.99",
            originalPrice: "$8.99",
            discountedPrice: "$5.99",
            discount: "33%",
            image: third,
            badge: "Most Popular",
        },
        {
            id: 2,
            title: "Breakfast Bundle",
            description: "Coffee and any breakfast item at 20% off",
            originalPrice: "$6.50",
            discountedPrice: "$5.20",
            discount: "20%",
            image: four,
            badge: "Staff Pick",
        },
        {
            id: 3,
            title: "Group Study Pack",
            description: "4 coffees and 4 pastries for the price of 3",
            originalPrice: "$24.00",
            discountedPrice: "$18.00",
            discount: "25%",
            image: third,
            badge: "Best Value",
        },
    ]

    const dailySpecials = [
        {
            day: "Monday",
            title: "Meatless Monday",
            description: "All vegetarian dishes at 15% off",
            image: third,
        },
        {
            day: "Tuesday",
            title: "Taco Tuesday",
            description: "Buy 2 tacos, get 1 free",
            image: four,
        },
        {
            day: "Wednesday",
            title: "Wellness Wednesday",
            description: "20% off all salads and healthy bowls",
            image: third,
        },
        {
            day: "Thursday",
            title: "Thirsty Thursday",
            description: "All smoothies and specialty drinks $1 off",
            image: four,
        },
        {
            day: "Friday",
            title: "Pizza Friday",
            description: "Buy one slice, get second at half price",
            image: third,
        },
    ]

    const mealPlans = [
        {
            id: 1,
            name: "Basic Plan",
            price: "$49.99",
            period: "per month",
            description: "Perfect for occasional visits",
            features: [
                "10 meals per month",
                "Free coffee with each meal",
                "No rollover meals",
                "10% off additional purchases",
            ],
        },
        {
            id: 2,
            name: "Standard Plan",
            price: "$89.99",
            period: "per month",
            description: "Our most popular option",
            features: [
                "20 meals per month",
                "Free coffee and soft drinks",
                "Rollover up to 5 meals",
                "15% off additional purchases",
                "Priority service during rush hours",
            ],
            highlighted: true,
        },
        {
            id: 3,
            name: "Premium Plan",
            price: "$129.99",
            period: "per month",
            description: "For power users and regulars",
            features: [
                "Unlimited meals (max 2 per day)",
                "Free beverages with each meal",
                "20% off additional purchases",
                "Priority service always",
                "Exclusive monthly specials",
                "Bring a friend for free once a week",
            ],
        },
    ]

    return (
        <div className="special-offers-page">
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
                    <a href="/">Home</a>
                    <a href="#offers" className={activeSection === "offers" ? "active" : ""}>
                        Offers
                    </a>
                    <a href="#daily-specials" className={activeSection === "daily-specials" ? "active" : ""}>
                        Daily Specials
                    </a>
                    <a href="#meal-plans" className={activeSection === "meal-plans" ? "active" : ""}>
                        Meal Plans
                    </a>
                    <a href="#limited-time" className={activeSection === "limited-time" ? "active" : ""}>
                        Limited Time
                    </a>
                    <button className="order-button">Order Now</button>
                </nav>
            </header>

            {/* Hero Section */}
            <section id="offers" className="offers-hero-section">
                <div className="offers-hero-content">
                    <div className="offers-badge reveal">Limited Time Offers</div>
                    <h1 className="offers-hero-title reveal">
                        Special Deals <br />
                        <span className="highlight">Just For Students</span>
                    </h1>
                    <p className="offers-hero-subtitle reveal">
                        Exclusive discounts and promotions to keep you fueled throughout the semester
                    </p>
                    {/* <div className="offers-hero-buttons reveal">
            <button className="primary-button">View All Offers</button>
            <button className="secondary-button">Join Rewards Program</button>
          </div> */}
                </div>
                <div className="offers-hero-image reveal">
                <img src={four} alt="Delicious canteen food" />
                    <div className="floating-badge">
                        <span>
                            Up to
                            <br />
                            50%
                            <br />
                            OFF
                        </span>
                    </div>
                </div>
            </section>

            {/* Featured Offers */}
            <section className="featured-offers-section">
                <div className="section-header reveal">
                    <h2>
                        Featured <span className="highlight">Offers</span>
                    </h2>
                    <p>Our most popular deals that students love</p>
                </div>
                <div className="featured-offers-grid reveal">
                    {featuredOffers.map((offer) => (
                        <div className="offer-card" key={offer.id}>
                            <div className="offer-image">
                                <img src={offer.image || "/placeholder.svg"} alt={offer.title} />
                                {offer.badge && <span className="offer-badge">{offer.badge}</span>}
                                <span className="discount-badge">-{offer.discount}</span>
                            </div>
                            <div className="offer-content">
                                <h3>{offer.title}</h3>
                                <p>{offer.description}</p>
                                <div className="offer-price">
                                    <span className="original-price">{offer.originalPrice}</span>
                                    <span className="discounted-price">{offer.discountedPrice}</span>
                                </div>
                                <button className="claim-offer-button">Claim Offer</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Daily Specials */}
            <section id="daily-specials" className="daily-specials-section">
                <div className="section-header reveal">
                    <h2>
                        Daily <span className="highlight">Specials</span>
                    </h2>
                    <p>Different deals for every day of the week</p>
                </div>
                <div className="daily-specials-container reveal">
                    {dailySpecials.map((special, index) => (
                        <div className="daily-special-card" key={index}>
                            <div className="day-badge">{special.day}</div>
                            <div className="special-image">
                                <img src={special.image || "/placeholder.svg"} alt={special.title} />
                            </div>
                            <div className="special-content">
                                <h3>{special.title}</h3>
                                <p>{special.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Meal Plans */}
            <section id="meal-plans" className="meal-plans-section">
                <div className="section-header reveal">
                    <h2>
                        Student <span className="highlight">Meal Plans</span>
                    </h2>
                    <p>Save money with our subscription plans</p>
                </div>
                <div className="meal-plans-container reveal">
                    {mealPlans.map((plan) => (
                        <div className={`meal-plan-card ${plan.highlighted ? "highlighted" : ""}`} key={plan.id}>
                            {plan.highlighted && <div className="best-value-tag">Best Value</div>}
                            <h3>{plan.name}</h3>
                            <div className="plan-price">
                                <span className="price">{plan.price}</span>
                                <span className="period">{plan.period}</span>
                            </div>
                            <p className="plan-description">{plan.description}</p>
                            <ul className="plan-features">
                                {plan.features.map((feature, index) => (
                                    <li key={index}>
                                        <svg
                                            viewBox="0 0 24 24"
                                            width="16"
                                            height="16"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <button className={`plan-button ${plan.highlighted ? "highlighted-button" : ""}`}>Choose Plan</button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Limited Time Offer */}
            <section id="limited-time" className="limited-time-section">
                <div className="limited-time-container reveal">
                    <div className="limited-time-content">
                        <div className="flash-sale-badge">Flash Sale</div>
                        <h2>
                            End of Semester <span className="highlight">Special</span>
                        </h2>
                        <p>
                            Get 50% off on all menu items during finals week! Stock up on brain food and power through your exams.
                        </p>
                        <div className="countdown-container">
                            <div className="countdown-title">Offer Ends In:</div>
                            <div className="countdown-timer">
                                <div className="countdown-item">
                                    <div className="countdown-value">{countdown.days}</div>
                                    <div className="countdown-label">Days</div>
                                </div>
                                <div className="countdown-item">
                                    <div className="countdown-value">{countdown.hours}</div>
                                    <div className="countdown-label">Hours</div>
                                </div>
                                <div className="countdown-item">
                                    <div className="countdown-value">{countdown.minutes}</div>
                                    <div className="countdown-label">Minutes</div>
                                </div>
                                <div className="countdown-item">
                                    <div className="countdown-value">{countdown.seconds}</div>
                                    <div className="countdown-label">Seconds</div>
                                </div>
                            </div>
                        </div>
                        <button className="primary-button">Get This Deal</button>
                    </div>
                    <div className="limited-time-image">
                        <img src="/placeholder.svg?height=300&width=400" alt="Limited time offer" />
                    </div>
                </div>
            </section>

            {/* Referral Program */}
            {/* <section className="referral-section">
        <div className="referral-container reveal">
          <div className="referral-content">
            <h2>
              Refer a Friend, <span className="highlight">Get Rewarded</span>
            </h2>
            <p>
              Invite your friends to CampusEats and receive a $10 credit when they make their first purchase. Your
              friend gets $5 off their first order too!
            </p>
            <div className="referral-steps">
              <div className="referral-step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h4>Share Your Code</h4>
                  <p>Send your unique referral code to friends</p>
                </div>
              </div>
              <div className="referral-step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h4>Friend Orders</h4>
                  <p>They use your code on their first purchase</p>
                </div>
              </div>
              <div className="referral-step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h4>Both Get Rewarded</h4>
                  <p>You get $10, they get $5 off</p>
                </div>
              </div>
            </div>
            <div className="referral-form">
              <input type="text" value="CAMPUS-FRIEND-123" readOnly />
              <button className="copy-button">Copy Code</button>
            </div>
          </div>
        </div>
      </section> */}

            {/* Newsletter */}
            {/* <section className="newsletter-section">
        <div className="newsletter-container reveal">
          <div className="newsletter-content">
            <h2>
              Never Miss a <span className="highlight">Deal</span>
            </h2>
            <p>Subscribe to our newsletter and be the first to know about new offers, special deals, and discounts.</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Enter your email" />
              <button className="subscribe-button">Subscribe</button>
            </div>
            <p className="newsletter-disclaimer">We respect your privacy and will never share your information.</p>
          </div>
        </div>
      </section> */}

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
                            <a href="/">Home</a>
                            <a href="#offers">Offers</a>
                            <a href="#daily-specials">Daily Specials</a>
                            <a href="#meal-plans">Meal Plans</a>
                            <a href="#limited-time">Limited Time</a>
                        </div>
                        <div className="footer-column">
                            <h3>Information</h3>
                            <a href="#">About Us</a>
                            <a href="#">Menu</a>
                            <a href="#">Catering</a>
                            <a href="#">Careers</a>
                            <a href="#">FAQ</a>
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

