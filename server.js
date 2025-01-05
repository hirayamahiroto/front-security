const express = require("express");
const apiRouter = require("./routes/api");

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(
  "/api",
  (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, x-token");
    next();
  },
  apiRouter
);

// サーバを起動する
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
