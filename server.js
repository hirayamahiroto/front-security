const express = require("express");
const apiRouter = require("./routes/api");
const corsMiddleware = require("./middleware/cors");

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use("/api", corsMiddleware, apiRouter);

// サーバを起動する
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
