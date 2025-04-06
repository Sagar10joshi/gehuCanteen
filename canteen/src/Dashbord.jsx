// src/components/OrderDashboard.jsx   https://gehu-canteen.vercel.app/

import React, { useState, useEffect } from "react";
import './Dashboard.css'; // for styling

const OwnerDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch orders from the database (API)
    useEffect(() => {
        fetch("https://gehu-canteen-n6r8-sagars-projects-0f20619e.vercel.app/orders") // Make sure this matches your backend URL
            .then((response) => response.json()) // Parse the response to JSON
            .then((data) => {
                setOrders(data); // Set orders to state
                setLoading(false); // Stop loading once data is fetched
            })
            .catch((error) => {
                console.error("Error fetching orders:", error);
                setLoading(false); // Stop loading on error
            });
    }, []);

    // Handle confirming an order
    const handleConfirm = (orderId) => {
        fetch(`https://gehu-canteen-n6r8-sagars-projects-0f20619e.vercel.app/orders/confirm/${orderId}`, {
            method: "POST",
        })
            .then(() => {
                // Update the local state after confirming the order
                setOrders(orders.map(order =>
                    order._id === orderId ? { ...order, status: 'Confirmed' } : order
                ));
                
            })
            .catch(error => console.error("Error confirming order", error));
    };

    const handleReject = (orderId) => {
        fetch(`https://gehu-canteen-n6r8-sagars-projects-0f20619e.vercel.app/orders/reject/${orderId}`, {
            method: "POST",  // You can also use "PUT" depending on how your backend is configured
        })
            .then(() => {
                // Update the local state after rejecting the order
                setOrders(orders.map(order =>
                    order._id === orderId ? { ...order, status: 'Rejected' } : order
                ));

            })
            .catch(error => console.error("Error rejecting order", error));
    };



    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="order-dashboard">
            <h1>Order Dashboard</h1>
            <div className="orders-list">
                {orders.length === 0 ? (
                    <p>No orders yet.</p>
                ) : (
                    orders.map((order) => (
                        <div key={order._id} className="order-card">
                            <h3>Order #{order._id}</h3>
                            <p>Customer: {order.customerName}</p>
                            <p><b><u>Items:</u></b></p>
                            {
                                Array.isArray(order.cart) && order.cart.length > 0
                                    ? order.cart.map(item => (
                                        <p key={item.name}><strong>{item.name} × {item.quantity} </strong></p>
                                    ))
                                    : "No items available"
                            }
                            <p>Status: {order.status}</p>
                            <div className="order-actions">
                                <button
                                    onClick={() => handleConfirm(order._id)}
                                    className="btn-confirm"
                                    disabled={order.status === "Confirmed"}
                                >
                                    Confirm
                                </button>
                                <button
                                    onClick={() => handleReject(order._id)}
                                    className="btn-reject"
                                    disabled={order.status === "Rejected"}
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default OwnerDashboard;
