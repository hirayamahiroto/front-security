const corsMiddleware = (req, res, next) => {
  // 開発環境と本番環境で分けることも可能
  const allowedOrigins = ["http://localhost:3000", "https://your-production-domain.com"];

  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, x-token");

  // プリフライトリクエストの処理
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
};

module.exports = corsMiddleware;
