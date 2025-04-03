const express = require("express");
const app = express();
const port = 5004;
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();     //to access .env file
const {connectDb} = require("./connection");
const routes = require("./routes");

connectDb();
app.use(express.json());
app.use(
    cors({
        origin: ['http://localhost:5173', 'https://home-bites-sepia.vercel.app'],
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"], // Allow necessary methods
        allowedHeaders: ["Content-Type", "Authorization"], // Ensure correct headers
    })
);
app.use(cookieParser());

app.use("/api", routes);

app.listen(port, () => console.log(`Server running on port ${port}`));