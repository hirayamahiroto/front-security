const express = require("express");
const logger = require("./../logging/index");
const router = express.Router();

router.use(express.json());
router.get("/get", (req, res, next) => {
  let message = req.query.message;
  const lang = req.headers["x-lang"];

  if (!message) {
    res.status(400);
    message = lang === "ja" ? "リクエストが不正です" : "Bad Request";
  }

  res.send({
    status: "200",
    message: message,
    lang: lang,
  });
});

router.use(express.json());
router.post("/post", (req, res, next) => {
  const body = req.body;
  console.log(body);
  res.json({ status: "success", data: body });
});

router.get("/attack", (req, res, next) => {
  res.send("<script>alert('attack');</script>");
});

router.get("/redirect_constraint", (req, res) => {
  const ALLOWED_REDIRECT = ["/open_redirect.html"];
  if (!ALLOWED_REDIRECT.includes(req.query.url)) {
    return res.status(400).send("Unauthorized redirect");
  }
  res.redirect(req.query.url);
});

router.get("/redirect_no_constraint", (req, res) => {
  res.redirect(req.query.url);
});
module.exports = router;
