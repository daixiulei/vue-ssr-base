const { merge } = require("webpack-merge")
const baseConfig = require("./webpack.base.config")
const path = require("path")

const VueSSRClientPlugin = require("vue-server-renderer/client-plugin")
const webpack = require("webpack")

module.exports = merge(baseConfig, {
    entry: {
        app: path.resolve("src/entry-client.js")
    },
    output: {
        filename: "js/[name].[chunkhash].js",
        chunkFilename: "js/[id].[chunkhash].js"
    },
    module: {
        rules: []
    },
    optimization: {
        splitChunks: {
            name: "manifest",
            minChunks: Infinity
        }
    },
    plugins: [new VueSSRClientPlugin()]
})
