const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const getStyleLoader = () => {
  if (process.env.NODE_ENV === "production") {
    return MiniCssExtractPlugin.loader;
  }
  return "style-loader";
};

const getCssLoaders = (isModule) => {
  return !isModule
    ? "css-loader"
    : {
        loader: "css-loader", // 解析 CSS 文件
        options: {
          modules: {
            namedExport: false, // 是否启用命名导出
            localIdentName: "[name]__[local]--[hash:base64:5]", // 生成的类名格式
          },
        },
      };
};

module.exports = {
  getStyleLoader,
  getCssLoaders,
};
