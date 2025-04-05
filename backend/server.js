import express from "express";
import cors from "cors";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';
import { Server } from "socket.io";
import http from "http";
import { sendOtp } from "./api/mail.js";
import dbConnect from "./api/dbConnect.js";
import { User } from "./api/registerModel.js";
import { Order } from "./api/orderModel.js";
import { error } from "console";

const app = express();

// const server = http.createServer(app);

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
app.use(express.json());
app.use(express.urlencoded({ extended: false }))





app.get('/', (req, res) => {
  res.json("Welcome to Server")
})

app.get('/login', (req, res) => {
  res.json("Welcome to Login page")
})


app.post('/register', async (req, res) => {
  try {
    const { name, email, password, confirmPassword, role } = req.body;

    // Check if all fields are provided
    // if (!name || !email || !password || !confirmPassword || !role) {
    //   return res.status(400).json({ message: 'Please fill in all fields.' });
    // }

    // Check if passwords match
    // if (password !== confirmPassword) {
    //   return res.status(400).json({ message: 'Both password should match.' });
    // }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const otpTimestamp = Date.now();
    const token = jwt.sign({ name, role, email, password, otp, otpTimestamp }, '12345', { expiresIn: '5m' });

    if (email) {
      try {
        await sendOtp(email, otp);
        res.status(200).json({
          message: 'Otp sent successfully',
          token,
          redirect: '/otp'
        });
      } catch (error) {
        console.error('Error in sending otp', error)
        res.status(500).send('Error sending Otp , try again.')
      }
    } else {
      res.status(400).send('Email is required');
    }
  } catch (error) {
    console.error('Error during registration:', error); // Log the error with more details
    return res.status(500).json({ message: 'An error occurred. Please try again.', error: error.message });
  }
});



//Route for verifying otp and saving user in database

app.post('/otp', async (req, res) => {

  const token = req.headers['authorization']?.split(' ')[1]; // Assuming 'Bearer <token>'
  console.log('Received token:', token);
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const code = req.body.otp
    const currentTime = Date.now()
    const decoded = jwt.verify(token, '12345');
    const { otp, otpTimestamp } = decoded;
    // console.log('decoded');

    // Access the user data from the decoded token
    const { name, email, password, role } = decoded;




    if (code === otp && currentTime - otpTimestamp < 120000) {

      const saltRounds = 10; // You can adjust the number of salt rounds
      const hashedPassword = await bcrypt.hash(password, saltRounds); // Hashing the password
      console.log(hashedPassword);
      

      const registerUser = new User({
        name,
        email,
        password: hashedPassword,
        role
      })
      const Registered = await registerUser.save();
      return res.status(200).json({
        message: 'Registration successful!',
        redirect: '/login' // Redirect to quiz page
      });
    } else {
      return res.status(400).json({ message: "Invalid OTP" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
})

//Route for login

app.post('/login', async (req, res) => {
  try {

     // Set CORS headers for this specific route
     res.setHeader('Access-Control-Allow-Origin', 'https://gehu-canteen.vercel.app');
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
     res.setHeader('Access-Control-Allow-Credentials', 'true');

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
      name: userlogin.name,  // Send username
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


// API Endpoint to save order
app.post('/save-order', async (req, res) => {
  const { customerName, customerEmail, paymentMethod, cart, totalPrice, taxes, totalAmount } = req.body;

  // Log the cart array explicitly to view all item details
  // console.log('Received Order:', cart);

  const newOrder = new Order({
    customerName,
    customerEmail,
    paymentMethod,
    cart,
    totalPrice,
    taxes,
    totalAmount,
  });
  // console.log(' Order:', newOrder);

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json({ message: "Order saved successfully", orderId: savedOrder._id });
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({ message: "Failed to save order. Please try again later." });
  }
});

//Route for fetching orders

app.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find(); // Fetch all users from the database
    res.json(orders); // Respond with the list of users
  } catch (error) {
    res.status(500).json({ message: 'Server error' }); // Handle any errors
  }
});


// Route to confirm an order
app.post('/orders/confirm/:id', async (req, res) => {
  try {
    const orderId = req.params.id;
    const updatedOrder = await Order.findByIdAndUpdate(orderId, { status: 'Confirmed' }, { new: true });
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error confirming order', error });
  }
});




// Route to reject an order and delete it
app.post('/orders/reject/:id', async (req, res) => {
  try {
    const orderId = req.params.id;
    // First, let's delete the order from the database
    const deletedOrder = await Order.findByIdAndDelete(orderId);

    // If the order doesn't exist, return an error
    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({ message: 'Order rejected and deleted', order: deletedOrder });
  } catch (error) {
    res.status(500).json({ message: 'Error rejecting and deleting order', error });
  }
});



// // // ✅ Enable CORS for Socket.io
// const io = new Server(server, {
//   cors: {
//     origin: "https://gehu-canteen.vercel.app/",  // Allow all origins temporarily
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true, // Allow credentials (cookies)
//   }
// });

// let messages = []; // Temporary storage for messages

// io.on("connection", (socket) => {
//   // console.log("User connected:", socket.id);

//   socket.on("sendMessage", ({ sender, userId, message }) => {
//     const newMessage = { sender, userId, message };
//     messages.push(newMessage);

//     // Send message to all clients (including owner)
//     io.emit("receiveMessage", newMessage);
//   });

//   socket.on("disconnect", () => {
//     // console.log("User disconnected:", socket.id);
//   });
// });

dbConnect()

export default app;

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
