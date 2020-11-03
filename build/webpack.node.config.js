const path = require("path")
const fs = require("fs")

let nodeModules = {}
fs.readdirSync("node_modules")
    .filter(x => {
        return [".bin"].indexOf(x) === -1
    })
    .forEach(mod => {
        nodeModules[mod] = { commonjs: mod }
    })

console.log(nodeModules)
module.exports = {
    mode: "production",
    target: "node",
    entry: path.resolve("server.js"),
    output: {
        libraryTarget: "commonjs",
        path: path.resolve("serverDist"),
        filename: "index.js",
        chunkFilename: "[name].chunk.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: ["babel-loader"],
                exclude: [path.resolve("node_modules")]
            },
            {
                test: /\.ts$/,
                loader: ["ts-loader"],
                exclude: [path.resolve("node_modules")]
            }
        ]
    },
    // externals: nodeModules,
    node: {
        fs: "empty",
        child_process: "empty",
        tls: "empty",
        net: "empty",
        path: "empty"
    }
}
