import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000", { transports: ["websocket"] }); // ✅ Use WebSocket transport

const OwnerChat = () => {
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState("");
  const [replyTo, setReplyTo] = useState(null);

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => socket.off("receiveMessage");
  }, []);

  const sendReply = () => {
    if (reply.trim() && replyTo) {
      const newMessage = { sender: "canteen", userId: replyTo, message: reply };
      socket.emit("sendMessage", newMessage);
      setMessages((prev) => [...prev, newMessage]);
      setReply("");
      setReplyTo(null);
    }
  };

  return (
    <div>
      <h2>Canteen Owner Chat</h2>
      <div style={{ height: "300px", overflowY: "scroll", border: "1px solid black" }}>
        {messages.map((msg, index) => (
          <div key={index} onClick={() => setReplyTo(msg.userId)} style={{ cursor: "pointer" }}>
            <p><b>{msg.sender === "canteen" ? "You" : "User " + msg.userId}:</b> {msg.message}</p>
          </div>
        ))}
      </div>
      {replyTo && (
        <>
          <input type="text" value={reply} onChange={(e) => setReply(e.target.value)} />
          <button onClick={sendReply}>Reply</button>
        </>
      )}
    </div>
  );
};

export default OwnerChat;
