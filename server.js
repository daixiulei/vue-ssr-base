const app = require("express")()
const { createBundleRenderer } = require("vue-server-renderer")
const fs = require("fs")
const setupDevServer = require("./build/devServer")
const chalk = require("chalk")
const logger = require("./src/utils/logger")

const template = fs.readFileSync("./public/index.html", "utf-8")

const isProduction = process.env.NODE_ENV == "production"
let renderer

if (isProduction) {
    const serverBundle = require("./dist/vue-ssr-server-bundle.json")
    const clientManifest = require("./dist/vue-ssr-client-manifest.json")

    // 创建一个render，用来将Vue实例编译并插入到HTML中
    renderer = createBundleRenderer(serverBundle, {
        runInNewContext: false,
        template,
        clientManifest
    })
} else {
    setupDevServer(app, function(serverBundle, clientManifest) {
        console.log("get bundle")
        logger.info(chalk.blue("Got bundle! Application will update"))
        renderer = createBundleRenderer(serverBundle, {
            runInNewContext: false,
            template,
            clientManifest
        })
    })
}

// 拦截路由
app.use("/", (req, res) => {
    const url = req.url
    console.log(url)
    const context = {
        url: url,
        title: "vue ssr",
        meta: `
            <meta name="keyword" content="vue,ssr">
            <meta name="description" content="vue srr demo">
        `
    }

    // 将Vue实例渲染成HTML
    renderer.renderToString(context, (err, html) => {
        if (err) {
            logger.error(chalk.red(JSON.stringify(err)))
            res.status(err.code || 500).end("Internal Server Error")
            return
        }
        console.log(html)
        res.end(html)
    })
})

app.listen(3000, () => {
    logger.info(chalk.green("Server is running on http://localhost:3000"))
})
