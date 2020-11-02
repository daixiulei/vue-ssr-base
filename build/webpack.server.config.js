const { merge } = require("webpack-merge")
const baseConfig = require("./webpack.base.config")
const nodeExternals = require("webpack-node-externals")
const VueSSRServerPlugin = require("vue-server-renderer/server-plugin")
const path = require("path")
const webpack = require("webpack")

module.exports = merge(baseConfig, {
    target: "node",
    devtool: "source-map",
    entry: {
        app: path.resolve("src/entry-server.js")
    },
    output: {
        libraryTarget: "commonjs2",
        filename: "server-bundle.js"
    },
    externals: nodeExternals({
        allowlist: /\.css$/
    }),
    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_VUE": "server"
        }),
        new VueSSRServerPlugin()
    ]
})
