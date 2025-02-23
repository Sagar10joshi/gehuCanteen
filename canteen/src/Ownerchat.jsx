// import { useEffect, useState } from "react";
// import io from "socket.io-client";

// const socket = io("http://localhost:5000", { transports: ["websocket"] }); // ✅ Use WebSocket transport

// const OwnerChat = () => {
//   const [messages, setMessages] = useState([]);
//   const [reply, setReply] = useState("");
//   const [replyTo, setReplyTo] = useState(null);

//   useEffect(() => {
//     socket.on("receiveMessage", (data) => {
//       setMessages((prev) => [...prev, data]);
//     });

//     return () => socket.off("receiveMessage");
//   }, []);

//   const sendReply = () => {
//     if (reply.trim() && replyTo) {
//       const newMessage = { sender: "canteen", userId: replyTo, message: reply };
//       socket.emit("sendMessage", newMessage);
//       setMessages((prev) => [...prev, newMessage]);
//       setReply("");
//       setReplyTo(null);
//     }
//   };

//   return (
//     <div>
//       <h2>Canteen Owner Chat</h2>
//       <div style={{ height: "300px", overflowY: "scroll", border: "1px solid black" }}>
//         {messages.map((msg, index) => (
//           <div key={index} onClick={() => setReplyTo(msg.userId)} style={{ cursor: "pointer" }}>
//             <p><b>{msg.sender === "canteen" ? "You" : "User " + msg.userId}:</b> {msg.message}</p>
//           </div>
//         ))}
//       </div>
//       {replyTo && (
//         <>
//           <input type="text" value={reply} onChange={(e) => setReply(e.target.value)} />
//           <button onClick={sendReply}>Reply</button>
//         </>
//       )}
//     </div>
//   );
// };

// export default OwnerChat;






// import { useEffect, useState } from "react";
// import io from "socket.io-client";

// const socket = io("http://localhost:5000", { transports: ["websocket"] }); // ✅ Use WebSocket transport

// const OwnerChat = () => {
//   const [messages, setMessages] = useState([]);
//   const [reply, setReply] = useState("");
//   const [replyTo, setReplyTo] = useState(null);

//   useEffect(() => {
//     socket.on("receiveMessage", (data) => {
//       setMessages((prev) => [...prev, data]);
//     });

//     return () => socket.off("receiveMessage");
//   }, []);

//   const sendReply = () => {
//     if (reply.trim() && replyTo) {
//       const newMessage = { sender: "canteen", userId: replyTo, message: reply };
//       socket.emit("sendMessage", newMessage); // ✅ Send only, don't update state manually
//       setReply("");
//       setReplyTo(null);
//     }
//   };

//   return (
//     <div>
//       <h2>Canteen Owner Chat</h2>
//       <div style={{ height: "300px", overflowY: "scroll", border: "1px solid black" }}>
//         {messages.map((msg, index) => (
//           <div key={index} onClick={() => setReplyTo(msg.userId)} style={{ cursor: "pointer" ,textAlign: msg.sender === "user" ? "right" : "left" }} >
//             <p><b>{msg.sender === "canteen" ? "You" : "User " + msg.userId}:</b> {msg.message}</p>
//           </div>
//         ))}
//       </div>
//       {replyTo && (
//         <>
//           <input type="text" value={reply} onChange={(e) => setReply(e.target.value)} />
//           <button onClick={sendReply}>Reply</button>
//         </>
//       )}
//     </div>
//   );
// };

// export default OwnerChat;






// import { useEffect, useState } from "react";
// import io from "socket.io-client";

// const socket = io("http://localhost:5000", { transports: ["websocket"] });

// const OwnerChat = () => {
//   const [messages, setMessages] = useState([]);
//   const [reply, setReply] = useState("");
//   const [replyTo, setReplyTo] = useState(null);

//   useEffect(() => {
//     socket.on("receiveMessage", (data) => {
//       setMessages((prev) => {
//         // ✅ Avoid duplicate messages
//         if (!prev.some((msg) => msg.message === data.message && msg.userId === data.userId)) {
//           return [...prev, data];
//         }
//         return prev;
//       });
//     });

//     return () => socket.off("receiveMessage");
//   }, []);

//   const sendReply = () => {
//     if (reply.trim() && replyTo) {
//       const newMessage = { sender: "Canteen Owner", userId: replyTo, message: reply };
//       socket.emit("sendMessage", newMessage);

//       // ✅ Show the message immediately in UI
//       setMessages((prev) => [...prev, newMessage]);

//       setReply("");
//       setReplyTo(null);
//     }
//   };

//   return (
//     <div>
//       <h2>Canteen Owner Chat</h2>
//       <div style={{ height: "300px", overflowY: "scroll", border: "1px solid black" }}>
//         {messages.map((msg, index) => (
//           <div key={index} onClick={() => setReplyTo(msg.userId)} style={{ cursor: "pointer", textAlign: msg.sender === "user" ? "right" : "left" }}>
//             {/* <p><b>{msg.sender} ({msg.userId}):</b> {msg.message}</p> */}
//             <p><b>{msg.sender}:</b> {msg.message}</p>
//           </div>
//         ))}
//       </div>
//       {replyTo && (
//         <>
//           <input
//             type="text"
//             value={reply}
//             onChange={(e) => setReply(e.target.value)}
//             placeholder={`Reply to user ${replyTo}`}
//           />
//           <button onClick={sendReply}>Reply</button>
//         </>
//       )}
//     </div>
//   );

// };

// export default OwnerChat;





import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("https://gehu-canteen-n6r8-sagars-projects-0f20619e.vercel.app", { transports: ["websocket"], withCredentials: true });

const OwnerChat = () => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [reply, setReply] = useState("");

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);

      // ✅ Update user list when new messages arrive
      if (!users.some((user) => user.userId === data.userId)) {
        setUsers((prev) => [...prev, { userId: data.userId, username: data.sender }]);
      }
    });

    return () => socket.off("receiveMessage");
  }, [users]);

  const sendReply = () => {
    if (reply.trim() && selectedUser) {
      const newMessage = { sender: "Canteen Owner", userId: selectedUser.userId, message: reply };
      socket.emit("sendMessage", newMessage);

      // setMessages((prev) => [...prev, newMessage]);
      setReply("");
    }
  };

  return (
    <div style={{ display: "flex", height: "500px", border: "1px solid black" }}>
      {/* Sidebar for users list */}
      <div style={{ width: "30%", borderRight: "1px solid black", overflowY: "scroll" }}>
        <h3>Users</h3>
        {users.length === 0 ? (
          <p>No messages yet</p>
        ) : (
          users.map((user) => (
            <div
              key={user.userId}
              onClick={() => setSelectedUser(user)}
              style={{
                padding: "10px",
                cursor: "pointer",
                background: selectedUser?.userId === user.userId ? "#ddd" : "#fff",
              }}
            >
              {user.username}
            </div>
          ))
        )}
      </div>

      {/* Chat window */}
      <div style={{ width: "70%", padding: "10px", display: "flex", flexDirection: "column" }}>
        {selectedUser ? (
          <>
            <h3>Chat with {selectedUser.username}</h3>
            <div style={{ flex: 1, overflowY: "scroll", border: "1px solid gray", padding: "10px" }}>
              {messages
                .filter((msg) => msg.userId === selectedUser.userId)
                .map((msg, index) => (
                  <div
                    key={index}
                    style={{
                      textAlign: msg.sender === "Canteen Owner" ? "right" : "left",
                      marginBottom: "10px",
                    }}
                  >
                    <p>
                      <b>{msg.sender}:</b> {msg.message}
                    </p>
                  </div>
                ))}
            </div>
            <div style={{ display: "flex", marginTop: "10px" }}>
              <input
                type="text"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Type a reply..."
                style={{ flex: 1, padding: "5px" }}
              />
              <button onClick={sendReply} style={{ padding: "5px 10px" }}>
                Send
              </button>
            </div>
          </>
        ) : (
          <p>Select a user to chat</p>
        )}
      </div>
    </div>
  );
};

export default OwnerChat;
