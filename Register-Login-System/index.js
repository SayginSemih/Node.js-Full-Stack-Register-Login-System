const express = require("express");
const session = require("express-session");
const app = express();
const db = require("./controller/db");
const authsRouter = require("./router/authsRouter");

// session
app.use(session({
    secret: 'xASWDCvSW',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }));

// template engine
app.set("view engine", "ejs");

// static folder
app.use(express.static("public"));
app.use(express.static("node_modules"));

// routes
app.use("/user", authsRouter);

app.listen(3000, () => {
    console.log("3000 portuna istek gönderildi!");
    console.log("MySql veritabanına bağlantı sağlandı!");
})