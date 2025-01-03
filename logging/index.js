const log4js = require('log4js');

// log4jsの設定
log4js.configure('./logging/setting/index.json');
const logger = log4js.getLogger("server");

module.exports = logger;
