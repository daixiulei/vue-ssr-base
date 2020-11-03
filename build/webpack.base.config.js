const path = require("path")
const VueLoaderPlugin = require("vue-loader/lib/plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin")

const isProduction = process.env.NODE_ENV == "production"
module.exports = {
    mode: "production",
    output: {
        path: path.resolve("dist"),
        filename: "[name].js",
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader",
                options: {
                    extractCss: true
                }
            },
            {
                test: /\.js$/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                loader: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            {
                test: /\.scss$/,
                loader: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: isProduction ? (process.env.NODE_VUE == "server" ? [] : ["**/*", "!*.json"]) : []
        }),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash].css",
            chunkFilename: "css/[id].[contenthash].css"
        }),
        new FriendlyErrorsPlugin()
    ],
    resolve: {
        alias: {
            "@": path.resolve("src"),
            "@client": path.resolve("src/client"),
            "@server": path.resolve("src/server"),
            "@utils": path.resolve("src/utils")
        }
    }
}
