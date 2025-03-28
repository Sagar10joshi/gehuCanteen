import React from "react";
import { BrowserRouter as Router, Route, Routes , Navigate } from "react-router-dom";
import Chat from "./Chat";
import OwnerChat from "./Ownerchat"
import Homepage from "./Home"
import Register from "./Register";
import Login from "./Login";
import MyCart from "./Mycart";
import CanteenMenu from "./Canteenmenu"
import CanteenOrderPage from "./Page"
import CollegeCanteenLanding from "./Homepage"
import SpecialOffers from "./Special"

// const isOwner = () => {
//   const user = JSON.parse(localStorage.getItem("role"));
//   return user && user.role === "owner"; // Check if the user is an owner
// };

function App() {

  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Homepage />} /> */}
        <Route path="/" element={<CollegeCanteenLanding />} />
        <Route path="/mycart" element={<MyCart />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/Menu" element={<CanteenMenu />} />
        <Route path="/Order" element={<CanteenOrderPage />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/mycart" element={<MyCart />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/Special" element={<SpecialOffers />} />
        {/* <Route path="/chat" element={<Chat />} /> */}
        {/* <Route path="/owner" element={<OwnerChat />} />  */}
        {/* <Route path="/owner" element={isOwner() ? <OwnerChat /> : <Navigate to="/" />}/> */}
      </Routes>
    </Router>
  )
}

export default App;
