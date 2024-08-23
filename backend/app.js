const express = require("express");
const dotenv = require("dotenv")
dotenv.config()
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/userRouter");
const errorHandler = require("./middlewares/errorHandlerMiddleware");
const categoryRouter = require("./routes/categoryRouter");
const transactionRouter = require("./routes/transactionRouter");
const app = express();

//!Connect to mongodb
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connected"))
  .catch((e) => console.log(e));

//! Cors config
const allowedOrigins = ["https://monerchy.vercel.app"]
app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true)

        if (!allowedOrigins.includes(origin)) {
            const err = new Error('CORS wahala 😂😂')
            return callback(err, false)
        }

        return callback(null, true)
    }, credentials: true
}));
//!Middlewares
app.use(express.json()); //?Pass incoming json data
//!Routes
app.use("/", userRouter);
app.use("/", categoryRouter);
app.use("/", transactionRouter);
//! Error
app.use(errorHandler);

//!Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(`Server is running on this port... ${PORT} `)
);
