const corsMiddleware = require("./cors/cors");
const publicMiddleware = require("./public");

module.exports = {
  cors: corsMiddleware,
  public: publicMiddleware,
};
