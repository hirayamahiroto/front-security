const express = require("express");
const router = express.Router();

router.get("/get", (req, res, next) => {
  res.send({ message: "Hello World" });
});

router.use(express.json());
router.post("/post", (req, res, next) => {
    const body = req.body;
    console.log(body);
    res.json({ status: 'success', data: body });
});

module.exports = router;
