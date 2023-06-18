const path = require('path');
var webpack = require('webpack');

module.exports = {
    target: 'node',
    context: __dirname,
    entry: ["./src/server.ts"],
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "server.js"
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.jsx', '.json'],
        modules: [
            path.resolve('./node_modules'),
            path.resolve('./src')
        ],
        alias: {
            "@": path.resolve('./src')
        }
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false },
            minimize: true,
            sourceMap: true
        })
    ]
};