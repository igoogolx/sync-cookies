const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = (env) => {
    const isDev = env.NODE_ENV === "development";
    return {
        optimization: {
            usedExports: true
        },
        entry: path.resolve(__dirname, "..", "src", "index.tsx"),
        output: {
            path: path.resolve(__dirname, "..", "dist"),
            filename: "bundle.js",
            clean: {
                dry: true,
            },
        },
        devServer: {
            compress: true,
            port: 3000,
            historyApiFallback: true,
        },
        module: {
            rules: [
                {
                    test: /\.svg/,
                    type: "asset/resource",
                    generator: {
                        filename: "static/[hash][ext][query]",
                    },
                },
                {
                    test: /\.tsx?$/,
                    use: {
                        loader: "ts-loader",
                        options: {
                            happyPackMode: !isDev
                        },
                    },
                },
                {
                    test: /\.css$/i,
                    use: [
                        {
                            loader: "css-loader",
                        },
                        "postcss-loader",
                    ],
                    include: /\.module\.css$/,
                },
            ],
        },
        resolve: {
            extensions: [".tsx", ".ts", ".js"],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, "..", "src", "index.html"),
            }),
            new webpack.DefinePlugin({
                "process.env.NODE_ENV": JSON.stringify(env.NODE_ENV),
            }),
        ].filter(Boolean),
    };
};
