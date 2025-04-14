const BaseConfig = require("./webpack.base");
const { merge } = require("webpack-merge");
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
    static: true
  },
});
