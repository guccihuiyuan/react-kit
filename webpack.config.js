const path = require('path');
// 防止 node_modules 目录下的第三方模块被打包进去
const WebpackNodeExternals = require('webpack-node-externals');
// 清除打包目录下的所有文件
const CleanWebpackPlugin = require('clean-webpack-plugin');
// // 抽离css样式
// const ExtractTextPlugin = require("extract-text-webpack-plugin");

// 从环境变量中换取 PACKAGE_NAME 值
const PACKAGE_NAME = process.env.PACKAGE_NAME;

const webpackConfig = {
    // 模式 "production" | "development" | "none"
    mode: 'production',

    // 入口
    entry: {
    },

    // 出口
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'projects/react-kit/' + PACKAGE_NAME + '/dist'),
        libraryTarget: 'umd'
    },

    // 解析
    resolve: {
        // 引入文件时候，可以不加后缀
        extensions: ['.ts', '.tsx', '.js', ".json"]
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
        // new ExtractTextPlugin({
        //     filename: 'index.css'
        // })
    ]
};

if (PACKAGE_NAME === 'http') {
    webpackConfig.entry = {
        "react-kit-http": './projects/react-kit/http/src/index.ts'
    };
    webpackConfig.plugins.push(
        new CleanWebpackPlugin([
            'projects/react-kit/http/dist'
        ])
    );
} else if(PACKAGE_NAME === 'auth') {
    webpackConfig.entry = {
        "react-kit-auth": './projects/react-kit/auth/src/index.ts'
    };
    webpackConfig.plugins.push(
        new CleanWebpackPlugin([
            'projects/react-kit/auth/dist'
        ])
    );
}

module.exports = webpackConfig;
