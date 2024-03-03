const express = require("express")
const app = express();
const router = express.Router();
const session = require("express-session");
var bodyParser = require('body-parser');
const register = require("../controller/authsController");
const userVerryfield = require("../controller/userVerryfield");
const tokenController = require("../controller/tokenController");
const db = require("../controller/db");

// session middleware
app.use(session({
    secret: 'xASWDCvSW',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }));

// POST islemini cozumlemek icin gerekli bir ayristirici
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/user/login");
})

router.get("/login", (req, res) => {
    const token = tokenController(req)
    if (token)
        res.redirect("/user")
    else
    {
        res.render("login", {
            err_msg: false
        });
    }
});

router.get("/register", urlencodedParser, (req, res) => {
    const token = tokenController(req)
    if (token)
        res.redirect("/user")
    else
    {
        res.render("register", {
            user_err_msg: false,
            err_msg: false,
            succes_msg: false
        })
    }
});

router.post("/login", urlencodedParser, async (req, res) => {
    const username = req.body.username
    const passwd = req.body.passwd
    await db.connect(async () => {
        await db.promise().query("SELECT * FROM users WHERE username=? AND passwd=?", [username, passwd])
        .then( q => {
            if (q[0].length>0)
            {
                req.session.token=username
                res.redirect("/user")
            }
            else
            {
                res.render("login", {
                    err_msg: {message: "Kullanıcı adı veya şifre hatalı!"}
                })
            }})
        .catch( err => {
            console.log("HATA :" + err)
        })
    })        
})

router.post("/register", urlencodedParser, async (req, res) => {
    const username = req.body.username
    const passwd = req.body.passwd
    const repasswd = req.body.repasswd
    let errors=[]
    await db.connect(async () => {
        await db.promise().query("SELECT * FROM users WHERE username='"+ username +"'")
        .then( q => {
            if (q[0].length>0)
            {
                return res.render("register", {
                    user_err_msg: { message: "Bu kullanıcı adı zaten mevcut!"},
                    err_msg: false,
                    succes_msg: false
                })
            }
            else
            {
                const veryfield = userVerryfield(username, passwd, repasswd);
                if (veryfield.length > 0)
                {
                    return res.render("register", {
                        user_err_msg: false,
                        err_msg: veryfield,
                        succes_msg: false
                    })
                }
                else
                {
                    register(username, passwd);
                    res.render("register", {
                        user_err_msg: false,
                        err_msg: false,
                        succes_msg: { message: "Kayıt işlemi başarıyla gerçekleşti" }
                    });
                }
            }
        })
        .catch( err => {
            console.log("HATA :" + err)
        })
    })        
})

router.get("/", urlencodedParser, (req, res) => {
    const token = tokenController(req)
    if (token)
    {
        const user=req.session.token
        res.render("user", {
            userdata: user
        })
    }
    else
    {
        res.redirect("/user/login");
    }
})

module.exports = router;