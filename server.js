const express = require("express");
const apiRouter = require("./routes/api");

const app = express(); 
const port = 3000; 

app.use(express.static('public'));

// apiのルーティング
app.use("/api", apiRouter);

 // サーバを起動する
 app.listen(port, () => { 
   console.log(`Server is running on http://localhost:${port}`);
 });
