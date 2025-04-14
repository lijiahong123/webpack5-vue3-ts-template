const BaseConfig = require("./webpack.base");
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
/**
 * @type {import('webpack').Configuration}
 * @description webpack开发环境配置
 */
module.exports = merge(BaseConfig, {
  mode: "production", // 开发模式
  optimization: {
    minimize: true, // 是否压缩代码,为了调试方便，配置完后删除
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[contenthash:6].css", // 提取的css文件名
    }),
  ],
});
