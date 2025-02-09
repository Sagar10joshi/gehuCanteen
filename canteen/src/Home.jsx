import { useEffect, useState } from "react";
import Lottie from 'react-lottie';
import animationData from './images/Anim.json';
import "./Home.css"
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import logo from './images/LOGO.jpg';
import first from './images/apptiter.jpg';
import sec from './images/maincourse.png';
import third from './images/desret.png';
import four from './images/beeverage.png';
import 'font-awesome/css/font-awesome.min.css';


const menuData = [
    {
        title: "Appetizers",
        image :first,
        items: [
            "Spring Rolls: $5.00",
            "Garlic Bread: $4.00",
            "Stuffed Mushrooms: $6.50",
        ],
    },
    {
        title: "Main Course",
        image: sec,
        items: [
            "Grilled Chicken: $12.00",
            "Spaghetti Bolognese: $10.00",
            "Vegetable Stir-fry: $9.50",
        ],
    },
    {
        title: "Desserts",
        image: third,
        items: [
            "Chocolate Cake: $7.00",
            "Ice Cream Sundae: $5.50",
            "Fruit Salad: $4.50",
        ],
    },
    {
        title: "Beverages",
        image: four,
        items: [
            "Coffee: $3.00",
            "Fresh Juice: $4.00",
            "Soft Drinks: $2.50",
        ],
    },
];

const Homepage = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate(); // Correctly defined here

    // Check if the user is logged in from localStorage on component mount
    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    // Simulate login and store the state in localStorage
    const handleLogin = () => {
        const token = sessionStorage.getItem("token");
        if (token) {
            // console.log(token);
            setIsLoggedIn(true);
        }
    };
    // Simulate logout and remove the state from localStorage
    const handleLogout = () => {
        // Clear session storage
        sessionStorage.removeItem("token");

        // Update the state to reflect that the user is logged out
        setIsLoggedIn(false);

        // Optionally, close the sidebar after logout
        setIsSidebarOpen(false);
    };

    // Function to toggle the sidebar visibility
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

    const MenuItem = ({ title, image, items }) => {
        const [isActive, setIsActive] = useState(false);

        const toggleMenu = () => {
            setIsActive(!isActive);
        };

        return (
            <div className={`menu-item ${isActive ? "active" : ""}`}>
                <div className="menu-title" onClick={toggleMenu}>
                    <img src={image} alt={title} className="menu-image" />
                    <h3>{title}</h3>
                    <span className="arrow">{isActive ? "▲" : "▼"}</span>
                </div>
                <div className="menu-content" style={{ maxHeight: isActive ? "120px" : "0" }}>
                    {items.map((item, index) => (
                        <p key={index}>{item}</p>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="navbar">
                <div id="logo">
                    <img src={logo} alt="Sagar Joshi" />
                </div>
                <ul>
                    <li className="item"><a href="">Home</a></li>
                    <li className="item"><a href="">Services</a></li>
                    <li className="item"><a href="">About Us</a></li>
                </ul>
                <div id="right">

                    <ul>
                        {isLoggedIn ? (
                            <li className="item">
                                <i className="fa-solid fa-bars " onClick={toggleSidebar} id="sideicon"></i>
                            </li>

                        ) : (
                            <li className="item"><a href="/login" onClick={handleLogin}>Login/Register</a></li>
                        )}
                    </ul>
                    <div className={`bardata ${isSidebarOpen ? 'open' : 'closed'}`} id="barside">
                        <div className="box">
                            <i className="fa-solid fa-user"></i>
                            <a href="">My Profile</a>
                        </div>
                        <hr />
                        <div className="box">
                            <i className="fa-solid fa-cart-shopping"></i>
                            <a href="/mycart">My Cart</a>
                        </div>
                        <hr />
                        <div className="box">
                            <i className="fa-solid fa-comment-dots"></i>
                            <a href="">Chat Canteen</a>
                        </div>
                        <hr />
                        <div className="box">
                            <i className="fa-solid fa-comment-dots"></i>
                            <a href="">My Orders</a>
                        </div>
                        <hr />
                        <div className="box">
                            <i className="fa-solid fa-right-from-bracket"></i>
                            <a href="" onClick={handleLogout}>Logout</a>
                        </div>
                    </div>
                </div>
            </div>
            <section id="home">
                <h1 className="h-primary">Welcome to GEHU Canteen</h1>
                <p>Variety of fast foods are available here at very afordable price . Every food is prepared with fresh items,</p>
                <p>Proper hygine is maintained , best place to come with your family and friends</p>
                <button className="btn">Order Now</button>
            </section> <br /> <br /> <br /> <br /> <br /> <hr />

            <section id="menu">
                <h2 align="center">* Our Specical Items *</h2>
                <Lottie options={{ animationData }} height={400} width={400} />

                <div className="menu-container">
                    <h1>Welcome to Gehu Canteen</h1>
                    <p className="tagline">Delicious dishes, from appetizers to desserts</p>
                    {menuData.map((menu, index) => (
                        <MenuItem key={index} {...menu} />
                    ))}
                </div>

            </section>
        </>
    )
}

export default Homepage;