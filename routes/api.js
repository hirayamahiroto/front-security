const express = require("express");
const logger = require("./../logging/index");
const router = express.Router();

router.use(express.json());
router.get("/get", (req, res, next) => {
  logger.debug("GET /get endpoint called");

  res.setHeader("X-Timestamp", Date.now());

  let message = req.query.message;
  const lang = req.headers["x-lang"];

  if (!message) {
    res.status(400);
    message = lang === "ja" ? "リクエストが不正です" : "Bad Request";
  }

  res.send({ message });
});

router.use(express.json());
router.post("/post", (req, res, next) => {
  const body = req.body;
  console.log(body);
  res.json({ status: "success", data: body });
});

module.exports = router;
