const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const crypto = require("crypto");
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

router.post("/login", (req, res, next) => {
  const reqBody = req.body;

  console.log(reqBody);

  if (!reqBody.username || !reqBody.password) {
    res.status(400).send("ユーザー名またはパスワードが入力されていません");
    return;
  }

  if (reqBody.username !== "admin" && reqBody.password !== "password") {
    res.status(400).send("ユーザー名またはパスワードが間違っています");
    return;
  }

  let session = req.session;
  session.username = reqBody.username;
  session.password = reqBody.password;

  // セッションにCSRFトークンを設定
  session.csrfToken = crypto.randomUUID();
  console.log(session.csrfToken);

  // クッキーにCSRFトークンを設定
  res.cookie("csrfToken", session.csrfToken);

  // CSRF検証ページにリダイレクト
  res.redirect("/csrf_test.html");
});

router.post("/remit", (req, res, next) => {
  // どのようなリクエストが来ているかを確認する
  console.log(req.session);
  console.log(req.url);
  console.log(req.body);

  if (!req.session.username || !req.session.password) {
    res.status(400).send("ログインしてください");
    return;
  }

  if (req.body.csrfToken !== req.session.csrfToken) {
    res.status(400).send("CSRFトークンが一致しません");
    return;
  }

  const reqBody = req.body;
  console.log(reqBody);
  res.send(`${req.session.username}さんが${reqBody.amount}円送金しました(${reqBody.message})`);
});

module.exports = router;
