const corsMiddleware = require("./cros");
const publicMiddleware = require("./public");

module.exports = {
  cors: corsMiddleware,
  public: publicMiddleware,
};
