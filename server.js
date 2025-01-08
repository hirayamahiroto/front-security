const express = require("express");
const crypto = require("crypto");
const apiRouter = require("./routes/api");
const { cors } = require("./middleware");

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use("/api", cors, apiRouter);

// ejsの設定
app.set("view engine", "ejs");
app.get("/csp", (req, res, next) => {
  // CSPで使用するnonceを生成
  const nonce = crypto.randomBytes(16).toString("hex");
  res.locals.nonce = nonce;

  // CSPのヘッダーを設定
  res.header("Content-Security-Policy", `script-src 'nonce-${nonce}'`);
  res.render("csp");
});

// サーバを起動する
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
