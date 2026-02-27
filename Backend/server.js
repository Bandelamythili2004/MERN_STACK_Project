// const express = require("express");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const authMiddleware = require("./middleware/authMiddleware");

// dotenv.config();

// const app = express();
// const paymentRoutes = require("./routes/paymentRoutes");
// app.use("/api/payment", paymentRoutes);
// app.use(express.json());
// // app.use(express.urlencoded({ extended: true }));
// app.use(cors());
// app.use("/api/auth",require("./routes/authRoutes"));
// app.use("/api",[authMiddleware],require("./routes/laptopRoutes"));
// app.use("/api",[authMiddleware],require("./routes/mobileRoutes"));
// app.use("/api",[authMiddleware],require("./routes/watchRoutes"));
// app.use("/api",[authMiddleware],require("./routes/cartRoutes"));

// console.log("MONGO_URL:", process.env.MONGO_URL);

// mongoose.connect(process.env.MONGO_URL)
// .then(()=>{
//     console.log("Connection Success");
//     app.listen(process.env.PORT,'0.0.0.0',()=>{
//         console.log("Server Started");
//     })
// })
// .catch((err)=>{
//     console.log(err);
//     console.log("Connection Failed")
// });

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authMiddleware = require("./middleware/authMiddleware");

dotenv.config();

const app = express();

/* ✅ 1. Enable CORS FIRST */
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

/* ✅ 2. Parse JSON BEFORE routes */
app.use(express.json());

/* ✅ 3. Routes AFTER middleware */
const paymentRoutes = require("./routes/paymentRoutes");
app.use("/api/payment", paymentRoutes);

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api", [authMiddleware], require("./routes/laptopRoutes"));
app.use("/api", [authMiddleware], require("./routes/mobileRoutes"));
app.use("/api", [authMiddleware], require("./routes/watchRoutes"));
app.use("/api", [authMiddleware], require("./routes/cartRoutes"));

console.log("MONGO_URL:", process.env.MONGO_URL);

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connection Success");
    app.listen(process.env.PORT, "0.0.0.0", () => {
      console.log("Server Started");
    });
  })
  .catch((err) => {
    console.log(err);
    console.log("Connection Failed");
  });