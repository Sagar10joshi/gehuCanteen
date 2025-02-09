import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Chat from "./Chat";
import OwnerChat from "./Ownerchat"
import Homepage from "./Home"
import Register from "./Register";
import Login from "./Login";
import MyCart from "./Mycart";
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mycart" element={<MyCart />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/chat" element={<Chat />} />
        <Route path="/owner" element={<OwnerChat />} /> */}
      </Routes>
    </Router>
  )
}

export default App;
