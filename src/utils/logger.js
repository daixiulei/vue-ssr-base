const log4j = require("log4js")
const path = require("path")

log4j.configure({
    appenders: {
        info: {
            type: "file",
            filename: path.resolve("logs/info.log")
        },
        error: {
            type: "file",
            filename: path.resolve("logs/error.log")
        },
        consoleout: {
            type: "console"
        }
    },
    categories: {
        default: {
            appenders: ["info", "consoleout"],
            level: "info"
        },
        error: {
            appenders: ["error", "consoleout"],
            level: "error"
        }
    }
})

const logger = log4j.getLogger(),
    errorLogger = log4j.getLogger("error")
module.exports = {
    debug: (...params) => logger.debug(...params),
    info: (...params) => logger.info(...params),
    warn: (...params) => logger.warn(...params),
    error: (...params) => errorLogger.error(...params),
    fatal: (...params) => errorLogger.fatal(...params)
}
