const BaseConfig = require("./webpack.base");
const { merge } = require("webpack-merge");
const ESLintPlugin = require("eslint-webpack-plugin");
const path = require("path");
/**
 * @type {import('webpack').Configuration}
 * @description webpack开发环境配置
 */
module.exports = merge(BaseConfig, {
  mode: "development", // 开发模式
  devtool: "eval-cheap-module-source-map", // 开启源代码映射，方便调试
  devServer: {
    port: 8080, // 端口号
    // open: true, // 自动打开浏览器
    historyApiFallback: true, // 解决history理由模式下刷新页面404时候，重定向到index.html
    static: true,
  },
  plugins: [
    new ESLintPlugin({
      extensions: ["ts", "js", "vue", "tsx", "jsx"], // 需要lint的文件后缀名
      context: path.resolve(__dirname, "../src"), // 需要lint的文件目录
      exclude: "node_modules", // 排除node_modules目录
      cache: true, // 开启缓存
      cacheLocation: path.resolve(__dirname, "../node_modules/.cache/.eslintcache"), // 缓存位置
    }),
  ],
});
