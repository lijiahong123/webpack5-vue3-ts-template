const path = require('path');


/**
 * @type {import('webpack').Configuration}
 * @description webpack基础配置
 */
module.exports = {
    entry: path.resolve(__dirname, '../src/main.ts'), // 入口文件
    output: {
        path: path.resolve(__dirname, '../dist'), // 打包后输出目录
        filename: 'js/[name].[contenthash:6].js',
        clean: true, // 清空上一次打包的输出目录， webpack5内置
        publicPath: '/', // 打包后的资源路径前缀
    }
}