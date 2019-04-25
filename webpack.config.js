const path = require('path');
// 防止 node_modules 目录下的第三方模块被打包进去
const WebpackNodeExternals = require('webpack-node-externals');
// 清除打包目录下的所有文件
const CleanWebpackPlugin = require('clean-webpack-plugin');
// // 抽离css样式
// const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    // 模式 "production" | "development" | "none"
    mode: 'none',

    entry: {
        // http
        // "react-kit-http": './projects/react-kit/http/src/index.ts',
        // auth
        "react-kit-auth": './projects/react-kit/auth/src/index.ts'
    },

    output: {
        filename: '[name].js',
        // http
        // path: path.resolve(__dirname, 'projects/react-kit/http/dist'),
        // auth
        path: path.resolve(__dirname, 'projects/react-kit/auth/dist'),
        libraryTarget: 'umd'
    },

    // 解析
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },

    // 以便发布调试
    devtool: 'source-map',

    module: {
        rules: [
            // {
            //     test: /\.js$/,
            //     use: 'babel-loader',
            //     exclude: /node_modules/
            // },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                // use: ExtractTextPlugin.extract({
                //     fallback: "style-loader",
                //     use: "css-loader"
                // })
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    externals: [WebpackNodeExternals()],
    plugins: [
        new CleanWebpackPlugin([
            'projects/react-kit/http/dist',
            'projects/react-kit/auth/dist',
        ]),
        // new ExtractTextPlugin({
        //     filename: 'index.css'
        // })
    ]
};
