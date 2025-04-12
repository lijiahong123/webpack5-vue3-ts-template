// babel.config.js
module.exports = {
  presets: [
    ["@babel/preset-env"], // 转换ES6+语法
    [
      "@babel/preset-typescript", // 转换TypeScript语法
      {
        allExtensions: true, // 允许所有扩展名的文件
      },
    ],
  ],
  plugins: [
    [
      "@babel/plugin-transform-runtime", // 减少代码重复，避免多次引入同一模块
      {
        corejs: 3, // 指定core-js版本
      },
    ],
  ],
};
