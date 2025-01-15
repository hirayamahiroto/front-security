const publicMiddleware = (req, res, next) => {
  res.setHeader("Content-Security-Policy", "frame-ancestors 'self'");
  next();
};

module.exports = publicMiddleware;
