const express = require("express");
const apiRouter = require("./routes/api");
const csrfRouter = require("./routes/csrf");
const corsMiddleware = require("./middleware/cros");
const publicMiddleware = require("./middleware/public");
const app = express();
const port = 3000;

// CSPのあり
// app.use((req, res, next) => {
//   const nonce = crypto.randomBytes(16).toString("base64");

//   // CSP（同一オリジンのリソースのみ読み込み可能、nonceを使用してスクリプトを読み込み可能にする（外部から挿入されたscriptは実行さない））
//   res.setHeader(
//     "Content-Security-Policy",
//     `default-src 'self'; script-src 'self' 'nonce-${nonce}'`
//   );

//   res.locals.nonce = nonce;

//   next();
// });
// CSPなし
app.use(express.static("public"), publicMiddleware);
app.use("/api", corsMiddleware, apiRouter);
app.use("/csrf", csrfRouter);
// サーバを起動する
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
