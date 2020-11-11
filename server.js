const express = require("express");
const dotenv = require("dotenv");
const bootcamps = require("./routes/bootcamps");
const morgan = require("morgan");
const connectDB = require("./config/db");

dotenv.config({ path: "./config/config.env" });
const app = express();

//database connection
connectDB();
// body parser
app.use(express.json());

// dev middleware
app.use(morgan("dev"));

app.use("/api/v1/bootcamp", bootcamps);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server is runnig on ${PORT}`));
