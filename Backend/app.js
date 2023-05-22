const express = require("express");
const app = express();
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const path = require("path");
require('dotenv').config();

//Cors (need to create a config file for better lisibility)
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", `${process.env.CLIENT_URL}`);
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});

//Routes files
const authRoutes = require("./routes/auth.routes");

//Middelwares always executed
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

//Routes
app.use("/api/auth", authRoutes);
module.exports = app;