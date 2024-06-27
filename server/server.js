require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const CryptoJS = require("crypto-js");
const bodyParser = require("body-parser");
const router = require("./router/auth-router");
const allRoute = require("./router/allData-router");
const coustomerRoute = require("./router/customer_router");
const adminRoute = require("./router/admin-router")
const connectDb = require("./utils/db");
const Razorpay = require("razorpay");
const fs = require("fs");
const PaymentModel = require("./models/payment");
const User = require("./models/user");
const multer = require('multer');
const path = require('path');

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static('public'));

app.use("/api/auth", router);
app.use("/api/data", allRoute);
app.use("/api/customer", coustomerRoute);
app.use("/api/admin", adminRoute);

const PORT = 3000;

// app.get('/nakul', (req, res) => {
//     // Get the IP address of the client
//     const ip = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress;
//     console.log("Request received from IP:", ip);

//     const log = `${Date.now()}: ${req.url} - new request received from IP: ${ip}\n`;
//     fs.appendFile("log.txt", log, (err) => {
//         if (err) {
//             console.error("Error writing to log file", err);
//             res.status(500).send("Internal Server Error");
//             return;
//         }

//         // Ensure the 'hello' response is defined
//         const hello = "Hello, world!"; // or any other appropriate response

//         res.send(hello);
//     });
// });
// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage
});

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
// Create an order
app.post("/create-order", async (req, res) => {
  const { amount, currency, receipt } = req.body;
  const options = {
    amount: amount * 100, // Amount in paise
    currency,
    receipt,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Handle payment callback
app.post("/payment-callback", async (req, res) => {
  const { orderId, paymentId, signature } = req.body;
  const crypto = require("crypto");

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(orderId + "|" + paymentId)
    .digest("hex");

  if (expectedSignature === signature) {
    const payment = new PaymentModel({
      userId: req.body.userId,
      customerMob: req.body.customerMob,
      orderId,
      paymentId,
      amount: req.body.amount,
      currency: req.body.currency,
      status: "Success",
      receipt: req.body.receipt,

    });
    await payment.save();
    res.json({ success: true });
  } else {
    res.status(400).send("Invalid signature");
  }
});

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "shubhambhange300@gmail.com",
    pass: "oqvt fwgy vinp qkfu",
  },
  debug: true,
});

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000); // Return numeric OTP
};

const hashPassword = (data) => {
  return CryptoJS.SHA256(data).toString(CryptoJS.enc.Hex); // Hash as string
};

app.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const otp = generateOTP();
    const hashedOTP = hashPassword(otp.toString()); // Hash OTP as a string
    user.otp = hashedOTP;
    await user.save();

    const mailOptions = {
      from: "shubhambhange300@gmail.com",
      to: email,
      subject: "Reset Password OTP",
      text: `Your OTP for resetting password is ${otp}`,
    };
    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.error("Error sending email: ", error);
        return res.status(500).json({ message: "Error sending OTP" });
      }
      return res.status(200).json({ message: "OTP sent successfully" });
    });
  } catch (error) {
    console.error("Error in forgot password: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/reset-password", async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const hashedOTP = hashPassword(otp);
    if (user.otp !== hashedOTP) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    // Hash the new password before updating the user document
    const hashedPassword = await bcrypt.hash(newPassword, 10); // 10 is the number of salt rounds
    user.password = hashedPassword;
    user.otp = undefined;
    await user.save();
    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error in reset password: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is runninig at Port: ${PORT}`);
  });
});
