const BaseConfig = require("./webpack.base");
const { merge } = require("webpack-merge");
/**
 * @type {import('webpack').Configuration}
 * @description webpack开发环境配置
 */
module.exports = merge(BaseConfig, {
  mode: "production", // 开发模式
});
