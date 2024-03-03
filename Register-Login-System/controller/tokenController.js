const express = require("express");
const app = express();
const session = require("express-session");

app.use(session({
    secret: 'xASWDCvSW',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }));

const tokenController = (req) => {
    if(req.session.token)
    {
        return true
    }
    else
    {
        return false
    }
}

module.exports = tokenController