const clientConfig = require("./webpack.client.config")
const serverConfig = require("./webpack.server.config")
const WebpackHotMiddleware = require("webpack-hot-middleware")
const WebpackDevMiddleware = require("webpack-dev-middleware")
const webpack = require("webpack")
const Mfs = require("memory-fs")
const path = require("path")
const chalk = require("chalk")
const logger = require("../src/utils/logger")

const readFile = (fsModule, path) => {
    try {
        return fsModule.readFileSync(path, "utf-8")
    } catch (error) {
        console.error(error)
    }
}

module.exports = function setupDevServer(app, cb) {
    let serverBundle, clientManifest

    // 当serverbundle或者clientManifest发生改变时，调用update
    function update() {
        if (serverBundle && clientManifest) {
            cb(serverBundle, clientManifest)
        }
    }

    // 根据开发环境，对webpack配置做一些修改
    clientConfig.entry.app = ["webpack-hot-middleware/client", clientConfig.entry.app]
    clientConfig.devtool = "source-map"
    clientConfig.output.filename = "[name].[hash].js"
    clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin())

    const clientCompiler = webpack(clientConfig),
        devServerMiddleware = WebpackDevMiddleware(clientCompiler, {
            publicPath: clientConfig.output.publicPath,
            noInfo: true
        }),
        hotReplaceMiddleware = WebpackHotMiddleware(clientCompiler, {
            log: false,
            noInfo: true,
            quite: true
        })

    app.use(devServerMiddleware)
    app.use(hotReplaceMiddleware)

    clientCompiler.hooks.done.tap("done", stats => {
        stats = stats.toJson()
        stats.errors.forEach(console.error)
        stats.warnings.forEach(console.warn)
        if (stats.errors.length > 0) {
            return
        }

        logger.info(chalk.blue("client manifest build complete"))
        try {
            clientManifest = JSON.parse(devServerMiddleware.fileSystem.readFileSync(path.join(clientConfig.output.path, "vue-ssr-client-manifest.json")))
            update()
        } catch (error) {
            connsole.error(error)
        }
    })

    const serverCompiler = webpack(serverConfig),
        mfs = new Mfs()
    serverCompiler.outputFileSystem = mfs
    serverCompiler.watch({}, (err, stats) => {
        if (err) throw err
        stats = stats.toJson()
        if (stats.errors.length > 0) return

        logger.info(chalk.blue("server bundle build complete"))
        try {
            serverBundle = JSON.parse(mfs.readFileSync(path.join(serverConfig.output.path, "vue-ssr-server-bundle.json")))
            update()
        } catch (error) {
            console.error(error)
        }
    })
}
