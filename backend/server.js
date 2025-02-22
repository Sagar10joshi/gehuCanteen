import express from "express";
import cors from "cors";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';
import { Server } from "socket.io";
import http from "http";
import dbConnect from "./api/dbConnect.js";
import { User } from "./api/registerModel.js";
import { error } from "console";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
const server = http.createServer(app);

// ✅ Enable CORS for Express
// app.use(cors({
//   origin: 'http://localhost:5173', // Replace with the URL of your frontend
//   credentials: true,               // Allow credentials (cookies)
//   methods: ["GET", "POST"]
// }));

const corsOptions = {
  origin: 'https://gehu-canteen.vercel.app',  // Allow only your frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true  // Allow cookies or credentials if needed
};

// Apply CORS middleware to all routes
app.use(cors(corsOptions)); 


app.get('/', (req, res) => {
  res.json("Welcome to Server")
})


app.post('/register', async (req, res) => {
  try {
    const { name, email, password, confirmPassword, role } = req.body;

    // Check if all fields are provided
    if (!name || !email || !password || !confirmPassword || !role) {
      return res.status(400).json({ message: 'Please fill in all fields.' });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match.' });
    }

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists!' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user object
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role
    });

    // Save the user to the database
    await newUser.save();

    // Return a successful response
    return res.status(200).json({
      message: 'Registration successful!',
      role: newUser.role,
      redirect: '/login' // Redirect after successful registration
    });

  } catch (error) {
    console.error('Error during registration:', error); // Log the error with more details
    return res.status(500).json({ message: 'An error occurred. Please try again.', error: error.message });
  }
});

//Route for login

app.post('/login', async (req, res) => {
  try {
    const { name, password } = req.body;

      const userlogin = await User.findOne({ name: name });     

      // console.log(userlogin)

      if (!userlogin) {
          return res.status(401).json({ message: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, userlogin.password); // Compare hashed password
      if (!isMatch) {
          return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Generate a JWT token
      const token = jwt.sign({ name: userlogin.name }, '321', { expiresIn: '1h' });

      return res.status(200).json({
          message: 'Login successful',
          name: userlogin.name ,  // Send username
          userId: userlogin._id,
          token,
          role: userlogin.role, // Send the role
          redirect: '/' // Redirect after login
      });

  } catch (error) {
      console.error('Login error:', error);
      res.status(500).send('An error occurred during login');
  }
});



// ✅ Enable CORS for Socket.io
const io = new Server(server, {
  cors: {
    origin: "https://gehu-canteen.vercel.app",  // Allow all origins temporarily
    methods: ["GET", "POST"],
    credentials: true, // Allow credentials (cookies)
  }
});

let messages = []; // Temporary storage for messages

io.on("connection", (socket) => {
  // console.log("User connected:", socket.id);

  socket.on("sendMessage", ({ sender, userId, message }) => {
    const newMessage = { sender, userId, message };
    messages.push(newMessage);

    // Send message to all clients (including owner)
    io.emit("receiveMessage", newMessage);
  });

  socket.on("disconnect", () => {
    // console.log("User disconnected:", socket.id);
  });
});

dbConnect()

export default app;

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
