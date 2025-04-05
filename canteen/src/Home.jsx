// import { useEffect, useState, useRef } from "react";
// import { Suspense, lazy } from 'react';
// import Lottie from 'react-lottie';
// // import { Lottie } from 'react-lottie-player';
// import animationData from './images/Anim.json';
// import "./Home.css"
// import "./Phonehome.css"
// import { useNavigate } from 'react-router-dom'; // Import useNavigate
// import logo from './images/LOGO.jpg';
// import first from './images/apptiter.jpg';
// import sec from './images/maincourse.png';
// import third from './images/desret.png';
// import four from './images/beeverage.png';
// import 'font-awesome/css/font-awesome.min.css';


// const menuData = [
//     {
//         title: "Appetizers",
//         // image: first,
//         items: [
//             "Bread Pakoda: $5.00",
//             "Chole Samose: $4.00",
//             "Masala Noodles: $6.50",
//             "Aaloo Paratha: $6.50"
//         ],
//     },
//     {
//         title: "Main Course",
//         // image: sec,
//         items: [
//             "Chole Chawal: $12.00",
//             "Chole Bhature: $10.00",
//             "Fried Rice: $9.50",
//         ],
//     },
//     {
//         title: "Desserts",
//         // image: third ,
//         items: [
//             "Choclates: $7.00",
//             "Ice Cream : $5.50",
//             "Fruit Salad: $4.50",
//         ],
//     },
//     {
//         title: "Beverages",
//         // image: four,
//         items: [
//             "Coffee: $3.00",
//             "Fresh Juice: $4.00",
//             "Soft Drinks: $2.50",
//             "Chai: $6.50"
//         ],
//     },
// ];

// const Homepage = () => {

//     // Get user details from localStorage
//     const users = JSON.parse(localStorage.getItem("role"));
//     console.log("Saved user:", localStorage.getItem("role"));
  

//   // Determine the chat route based on user role
//   const chatRoute = users?.role === "owner" ? "/owner" : "/chat";

//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//     const navigate = useNavigate(); // Correctly defined here
//     const serviceRef = useRef(null);
//     const LottieAnimation = lazy(() => import('react-lottie'));

//     // Check if the user is logged in from localStorage on component mount
//     useEffect(() => {
//         const token = sessionStorage.getItem("token");
//         if (token) {
//             setIsLoggedIn(true);
//         }
//     }, []);

//     const scrollToSection = (sectionRef) => {
//         setTimeout(() => {
//             const offset = 100; // Adjust this value based on your navbar height
//             const top = sectionRef.current.getBoundingClientRect().top + window.pageYOffset - offset;

//             window.scrollTo({
//                 top,
//                 behavior: 'smooth',
//             });
//         }, 10);  // Small delay to ensure smooth scroll
//     };

//     // Simulate login and store the state in localStorage
//     const handleLogin = () => {
//         const token = sessionStorage.getItem("token");
//         if (token) {
//             // console.log(token);
//             setIsLoggedIn(true);
//         }
//     };
//     // Simulate logout and remove the state from localStorage
//     const handleLogout = () => {
//         // Clear session storage
//         sessionStorage.removeItem("token");
//         localStorage.removeItem("role");
//         localStorage.removeItem("user");

//         // Update the state to reflect that the user is logged out
//         setIsLoggedIn(false);

//         // Optionally, close the sidebar after logout
//         setIsSidebarOpen(false);
//     };

//     // Function to toggle the sidebar visibility
//     const toggleSidebar = () => {
//         setIsSidebarOpen(!isSidebarOpen);
//     }

//     const MenuItem = ({ title, image, items }) => {
//         const [isActive, setIsActive] = useState(false);

//         const toggleMenu = () => {
//             setIsActive(!isActive);
//         };

//         return (
//             <div className={`menu-item ${isActive ? "active" : ""}`}>
//                 <div className="menu-title" onClick={toggleMenu}>
//                     <img src={image} alt={title} className="menu-image" loading="lazy" />
//                     <h3>{title}</h3>
//                     <span className="arrow">{isActive ? "▲" : "▼"}</span>
//                 </div>
//                 <div className="menu-content" style={{ maxHeight: isActive ? "140px" : "0" }}>
//                     {items.map((item, index) => (
//                         <p key={index}>{item}</p>
//                     ))}
//                 </div>
//             </div>
//         );
//     };

//     return (
//         <>
//             <div className="navbar">
//                 <div id="logo">
//                     <img src={logo} alt="Sagar Joshi" />
//                 </div>
//                 <ul>
//                     <li className="item"><a href="">Home</a></li>
//                     <li className="item"><a href="" onClick={(e) => { e.preventDefault(); scrollToSection(serviceRef); }}>Services</a></li>
//                     <li className="item"><a href="">About Us</a></li>
//                     {isLoggedIn ? (
//                         <li className="item">
//                             <i className="fa-solid fa-bars " onClick={toggleSidebar} id="sideicon"></i>
//                         </li>

//                     ) : (
//                         <li className="item"><a href="/login" onClick={handleLogin}>Log In</a></li>
//                     )}
//                 </ul>
//                 <div id="right">
//                     <div className={`bardata ${isSidebarOpen ? 'open' : 'closed'}`} id="barside">
//                         <div className="box1">
//                             <i className="fa-solid fa-user"></i>
//                             <a href="">My Profile</a>
//                         </div>
//                         <hr />
//                         <div className="box1">
//                             <i className="fa-solid fa-cart-shopping"></i>
//                             <a href="/mycart">My Cart</a>
//                         </div>
//                         <hr />
//                         <div className="box1">
//                             <i className="fa-solid fa-comment-dots"></i>
//                             {/* <a href="/chat">Chat</a> */}
//                             <a href={chatRoute}>Chat</a>
//                         </div>
//                         <hr />
//                         <div className="box1">
//                             <i className="fa-solid fa-comment-dots"></i>
//                             <a href="">My Orders</a>
//                         </div>
//                         <hr />
//                         <div className="box1">
//                             <i className="fa-solid fa-right-from-bracket"></i>
//                             <a href="" onClick={handleLogout}>Logout</a>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <section id="home">
//                 <br /> <br /><h1 className="h-primary">Welcome to GEHU Canteen</h1>
//                 <p>Variety of fast foods are available here at very afordable price . Every food is prepared with fresh items,</p>
//                 <p id="none">Proper hygine is maintained , best place to come with your family and friends</p>
//                 <button className="btn">Order Now</button>
//             </section> <br /> <br /> <br /> <br /> <br /> <hr />

//             <section id="menu">
//                 <h2 align="center">* Our Specical Items *</h2>
//                 <div className="lotti">< Lottie options={{ animationData }} style={{ margin: '0 auto' }} /></div>
//                 {/* 
//                 <div className="lotti">
//                     <Suspense fallback={<div>Loading animation...</div>}>
//                     <LottieAnimation options={{ animationData }} style={{ margin: '0 auto' }} />
//                 </Suspense>

//                     {/* <Suspense fallback={<div>Loading animation...</div>}>
//                         <Lottie options={{ animationData }} isStopped={!animationLoaded} />
//                     </Suspense> 
//                 </div> */}

//                 <div className="menu-container">
//                     <h1>Welcome to Gehu Canteen</h1>
//                     <p className="tagline">Delicious dishes, from appetizers to desserts</p>
//                     {menuData.map((menu, index) => (
//                         <MenuItem key={index} {...menu} />
//                     ))}
//                 </div>

//             </section>

//             <section className="service-container">
//                 <h1 className="h-primary center" id="shadow" ref={serviceRef}>~ Our Services ~</h1>
//                 <div id="services">
//                     <div className="box">
//                         <img src={sec} alt="Sagar Joshi" loading="lazy" />
//                         <h2 className="h-sec center">Food Ordering</h2>
//                         <p className="center">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae cum debitis corporis
//                             laborum dolorem quidem ipsum praesentium fuga saepe deserunt!Lorem ipsum dolor sit amet consectetur
//                             adipisicing elit. Eum placeat officia quasi atque debitis nemo fugit fugiat molestiae, quis sequi
//                             velit id magni!</p>
//                     </div>
//                     <div className="box">
//                         <img src={sec} alt="Sagar Joshi" loading="lazy" />
//                         <h2 className="h-sec center">Food Catering</h2>
//                         <p className="center">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae cum debitis corporis
//                             laborum dolorem quidem ipsum praesentium fuga saepe deserunt!Lorem ipsum dolor sit amet consectetur
//                             adipisicing elit. Eum placeat officia quasi atque debitis nemo fugit fugiat molestiae, quis sequi
//                             velit id magni!</p>
//                     </div>
//                     <div className="box">
//                         <img src={sec} alt="Sagar Joshi" loading="lazy" />
//                         <h2 className="h-sec center">Bulk Ordering</h2>
//                         <p className="center">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae cum debitis corporis
//                             laborum dolorem quidem ipsum praesentium fuga saepe deserunt!Lorem ipsum dolor sit amet consectetur
//                             adipisicing elit. Eum placeat officia quasi atque debitis nemo fugit fugiat molestiae, quis sequi
//                             velit id magni!</p>
//                     </div>
//                 </div>
//             </section>


//             <footer className="footer">
//                 <div className="footer-section">
//                     <h3>Contact Us</h3>
//                     <p><i className="fas fa-map-marker-alt"></i> Location</p>
//                     <p><i className="fas fa-phone"></i> Call +91 9897035395</p>
//                     <p><i className="fas fa-envelope"></i> Glacanteen@yahoo.in</p>
//                 </div>

//                 <div className="footer-section">
//                     <h2>Gehu Canteen</h2>
//                     <p>Our canteen is a haven for food enthusiasts, offering an extensive selection of delectable vegetarian dishes bursting with flavor and freshness.</p> <br /> <br />
//                     <div className="social-icons">
//                         <a href=""><i className="fab fa-facebook"></i></a>
//                         <a href=""><i className="fab fa-twitter"></i></a>
//                         <a href=""><i className="fab fa-linkedin"></i></a>
//                         <a href=""><i className="fab fa-instagram"></i></a>
//                     </div>
//                 </div>

//                 <div className="footer-section">
//                     <h3>Opening Hours</h3>
//                     <p>Everyday</p>
//                     <p>10.00 AM - 11.00 PM</p>
//                 </div>
//             </footer>
//         </>
//     )
// }

// export default Homepage;