const path = require("path");
const webpack = require("webpack");
const CSSMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const SvelteCheckPlugin = require("svelte-check-plugin");
const SveltePreprocess = require("svelte-preprocess");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = (env) => {
    const mode = env.mode || "development";
    const isDev = mode === "development";

    return {
        mode,
        entry: {
            app: path.resolve(__dirname, "src", "index.ts")
        },
        output: {
            filename: "[name].[contenthash:8].js",
            chunkFilename: "[name].[chunkhash:8].js",
            path: path.resolve(__dirname, "dist"),
            clean: true
        },
        devtool: isDev ? "eval-cheap-module-source-map" : false,
        devServer: {
            port: 3000,
            hot: true
        },
        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin(),
                new CSSMinimizerPlugin({
                    parallel: true
                })
            ]
        },
        target: "browserslist",
        resolve: {
            alias: {
                svelte: path.resolve("node_modules", "svelte/src/runtime")
            },
            extensions: [".js", ".ts", ".svelte"],
            mainFields: ["svelte", "browser", "module", "main"],
            modules: [path.resolve(__dirname, "src"), "node_modules"],
            conditionNames: ["svelte", "browser"]
        },
        plugins: [
            new webpack.ProgressPlugin(),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, "public", "index.html")
            }),
            new MiniCssExtractPlugin({
                filename: "[name].[contenthash:8].css",
                chunkFilename: "[name].[contenthash:8].css"
            }),
            new SvelteCheckPlugin()
        ],
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: "ts-loader",
                    exclude: /node_modules/
                },
                {
                    test: /\.svelte$/,
                    use: {
                        loader: "svelte-loader",
                        options: {
                            compilerOptions: {
                                dev: isDev
                            },
                            hotReload: isDev,
                            preprocess: SveltePreprocess({
                                less: true
                            })
                        }
                    }
                },
                {
                    test: /\.less$/i,
                    use: [
                        isDev ? "style-loader" : MiniCssExtractPlugin.loader,
                        "css-loader",
                        "less-loader"
                    ]
                },
                {
                    test: /\.woff(2)?$/,
                    type: "asset/resource",
                    generator: {
                        filename: "./fonts/[name][ext]"
                    }
                }
            ]
        }
    };
};
