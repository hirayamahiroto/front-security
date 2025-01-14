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
  session.csrfToken = crypto.randomUUID();
  res.cookie("csrfToken", session.csrfToken);
  res.redirect("/csrf_test.html");
});

router.post("/remit", (req, res, next) => {
  console.log("------------リクエスト-------------");
  console.log(req.session);
  console.log(req.headers);
  console.log(req.url);
  console.log(req.body);
  console.log("----------------------------------");

  if (!req.session.username || !req.session.password) {
    console.log("ログインしてください");
    console.log("----------------------------------");
    res.status(400).send("ログインしてください");
    return;
  }

  if (req.session.csrfToken !== req.cookies.csrfToken) {
    console.log("CSRFトークンが一致しません");
    console.log("----------------------------------");
    res.status(400).send("CSRFトークンが一致しません");
    return;
  }

  const reqBody = req.body;
  res.send(`${req.session.username}さんが${reqBody.amount}円送金しました(${reqBody.message})`);
});

// 現在認証されているかを確認する。
router.get("/check_auth", (req, res, next) => {
  console.log(req.session);

  const sessionFields = {
    username: "sessionにユーザー名がありません",
    password: "sessionにパスワードがありません",
  };

  for (const [field, message] of Object.entries(sessionFields)) {
    if (!req.session[field]) {
      console.log(message);
      res.status(400).send(message);
      return;
    }
  }
  res.send(`${req.session.username}さんがログインしています`);
});

module.exports = router;
