import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000", { transports: ["websocket"] }); // ✅ Use WebSocket transport

const Chat = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const userId = "user123"; // Temporary User ID

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      if (data.userId === userId || data.sender === "canteen") {
        setChat((prev) => [...prev, data]);
      }
    });

    return () => socket.off("receiveMessage");
  }, [userId]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = { sender: "user", userId, message };
      socket.emit("sendMessage", newMessage);
      setChat((prev) => [...prev, newMessage]);
      setMessage("");
    }
  };

  return (
    <div>
      <h2>Chat with Canteen</h2>
      <div style={{ height: "300px", overflowY: "scroll", border: "1px solid black" }}>
        {chat.map((msg, index) => (
          <div key={index} style={{ textAlign: msg.sender === "user" ? "right" : "left" }}>
            <p><b>{msg.sender} ({msg.userId}):</b> {msg.message}</p>
          </div>
        ))}
      </div>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
