const express = require("express");
const apiRouter = require("./routes/api");

const app = express();
const port = 3000;

// CSPヘッダーを追加
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline'; connect-src 'self' http://localhost:3000/*"
  );
  next();
});

app.use(express.static("public"));

// apiのルーティング
app.use("/api", apiRouter);

// サーバを起動する
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
