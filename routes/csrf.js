const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const router = express.Router();

router.use(cookieParser());
router.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      // ローカルではhttpsではないのでfalse （実際のアプリケーションではhttpsで通信することを推奨）
      // ローカルでは検証を行うため、falseにしている
      secure: false,
      maxAge: 60 * 1000 * 5,
    },
  })
);

router.use(express.urlencoded({ extended: true }));

// cookieを解析する(読み書きできるように指定)
router.use(cookieParser());

let sessionData = {};

router.get("/login", (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).send("ユーザー名またはパスワードが入力されていません");
    return;
  }

  if (username !== "admin" && password !== "password") {
    res.status(400).send("ユーザー名またはパスワードが間違っています");
    return;
  }

  session = req.session;
  session.sessionData = { username: username };
  res.redirect("/csrf_login_success.html");
});

module.exports = router;
