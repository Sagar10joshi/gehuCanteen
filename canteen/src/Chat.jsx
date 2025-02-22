// import { useEffect, useState } from "react";
// import io from "socket.io-client";

// const socket = io("http://localhost:5000", { transports: ["websocket"] }); // ✅ Use WebSocket transport

// const Chat = () => {
//   const [message, setMessage] = useState("");
//   const [chat, setChat] = useState([]);
//   const userId = "user123"; // Temporary User ID

//   useEffect(() => {
//     socket.on("receiveMessage", (data) => {
//       if (data.userId === userId || data.sender === "canteen") {
//         setChat((prev) => [...prev, data]);
//       }
//     });

//     return () => socket.off("receiveMessage");
//   }, [userId]);

//   const sendMessage = () => {
//     if (message.trim()) {
//       const newMessage = { sender: "user", userId, message };
//       socket.emit("sendMessage", newMessage);
//       setChat((prev) => [...prev, newMessage]);
//       setMessage("");
//     }
//   };

//   return (
//     <div>
//       <h2>Chat with Canteen</h2>
//       <div style={{ height: "300px", overflowY: "scroll", border: "1px solid black" }}>
//         {chat.map((msg, index) => (
//           <div key={index} style={{ textAlign: msg.sender === "user" ? "right" : "left" }}>
//             <p><b>{msg.sender} ({msg.userId}):</b> {msg.message}</p>
//           </div>
//         ))}
//       </div>
//       <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
//       <button onClick={sendMessage}>Send</button>
//     </div>
//   );
// };

// export default Chat;




// import { useEffect, useState } from "react";
// import io from "socket.io-client";

// const socket = io("http://localhost:5000", { transports: ["websocket"] }); // ✅ Use WebSocket transport

// const Chat = () => {
//   const [message, setMessage] = useState("");
//   const [chat, setChat] = useState([]);
//   // const userId = "user123"; // Temporary User ID



//   useEffect(() => {
//     socket.on("receiveMessage", (data) => {
//       if (data.userId === userId || data.sender === "canteen") {
//         setChat((prev) => [...prev, data]);
//       }
//     });

//     return () => socket.off("receiveMessage");
//   }, [userId]);

//   const sendMessage = () => {
//     if (message.trim()) {
//       const newMessage = { sender: "user", userId, message };
//       socket.emit("sendMessage", newMessage); // ✅ Send message to the server
//       setMessage(""); // ✅ Clear input but don't update chat manually
//     }
//   };

//   return (
//     <div>
//       <h2>Chat with Canteen</h2>
//       <div style={{ height: "300px", overflowY: "scroll", border: "1px solid black" }}>
//         {chat.map((msg, index) => (
//           <div key={index} style={{ textAlign: msg.sender === "user" ? "right" : "left" }}>
//             <p><b>{msg.sender} ({msg.userId}):</b> {msg.message}</p>
//           </div>
//         ))}
//       </div>
//       <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
//       <button onClick={sendMessage}>Send</button>
//     </div>
//   );
// };

// export default Chat;



import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("https://gehu-canteen-5ni8-sagars-projects-0f20619e.vercel.app", { transports: ["websocket"] });

const Chat = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  // Fetch the logged-in user from localStorage (or state management)
  // const user = (localStorage.getItem("user"));
  const user = JSON.parse(localStorage.getItem("user"));
  // console.log("User Data:", user.username);
  // console.log("Saved user:", localStorage.getItem("user"));

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      // Only display messages sent to the current user or from the canteen
      if (data.userId === user.userId || data.sender === "canteen") {
        setChat((prev) => [...prev, data]);
      }
    });

    return () => socket.off("receiveMessage");
  }, [user.userId]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = { sender: user.username, userId: user.userId, message };
      socket.emit("sendMessage", newMessage); // Send message with username and userId
      // setChat((prev) => [...prev, newMessage]); // Display the message immediately
      setMessage(""); // Clear input
    }
  };

  return (
    <div>
      <h2>Chat with Canteen</h2>
      <div style={{ height: "300px", overflowY: "scroll", border: "1px solid black" }}>
        {chat.map((msg, index) => (
          <div key={index} style={{ textAlign: msg.userId === user.userId ? "right" : "left" }}>
            {/* <p><b>{msg.sender} ({msg.userId}):</b> {msg.message}</p> */}
            <p><b>{msg.sender} :</b> {msg.message}</p>
          </div>
        ))}
      </div>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
