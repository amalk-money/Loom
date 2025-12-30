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

//Flash
const session = require('express-session');
const flash = require('connect-flash');

app.use(session({
  secret: 'yourSecretKey',   // change to a strong secret
  resave: false,
  saveUninitialized: true
}));

app.use(flash());

//Routes
const ownersRouter = require("./routes/ownersRouter");
app.use('/owners', ownersRouter);
const usersRouter = require("./routes/usersRouter");
app.use('/users', usersRouter);
const productsRouter = require("./routes/productsRouter");
app.use('/products', productsRouter);
const index = require("./routes/index")
app.use("/", index)

require("dotenv").config();

// App Listen
app.listen(3000);