const express = require("express");
const app = express();

// View Engine
app.set("view engine", "ejs");

// Database
const db = require("./config/mongoose-connection");

// JSON parsers
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Statis paths
const path = require("path");
app.set(express.static(path.join(__dirname, "public")));

// Cookies
const cookieParser = require("cookie-parser");
app.use(cookieParser());

//Routes
const ownersRouter = require("./routes/ownersRouter");
app.use('/owners', ownersRouter);

const usersRouter = require("./routes/usersRouter");
app.use('/users', usersRouter);

const productsRouter = require("./routes/productsRouter");
app.use('/products', productsRouter);

// App Listen
app.listen(3000);