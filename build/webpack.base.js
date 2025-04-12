const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader").VueLoaderPlugin;

/**
 * @type {import('webpack').Configuration}
 * @description webpack基础配置
 */
module.exports = {
  mode: "production",
  optimization: {
    minimize: false, // 是否压缩代码,为了调试方便，配置完后删除
  },
  entry: path.resolve(__dirname, "../src/main.ts"), // 入口文件
  output: {
    path: path.resolve(__dirname, "../dist"), // 打包后输出目录
    filename: "js/[name].[contenthash:6].js",
    clean: true, // 清空上一次打包的输出目录， webpack5内置
    publicPath: "/", // 打包后的资源路径前缀
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src"), // @指向src目录
      vue$: "vue/dist/vue.runtime.esm-bundler.js", // vue的运行时模块别名
    },
    extensions: [".ts", ".js", ".vue", ".json"], // 解析文件后缀名
    modules: [path.resolve(__dirname, "../src"), "node_modules"], // 告诉 webpack 解析模块时应该搜索的目录。
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"), // 模板文件
      filename: "index.html", // 打包后的文件名
      title: "webpack5-vue3-ts", // 页面标题
      inject: true, // 是否自动注入js和css文件
    }),
    new VueLoaderPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true, // 只进行类型检查，不进行编译
              appendTsSuffixTo: [/\.vue$/], // 给.vue文件添加ts后缀
            },
          },
          "babel-loader",
          // 已经迁移到babel.config.js中了
          //   {
          //     loader: "babel-loader",
          //     options: {
          //       presets: [
          //         [
          //           "@babel/preset-typescript",
          //           {
          //             allExtensions: true, // 允许所有扩展名的文件
          //           },
          //         ],
          //       ],
          //     },
          //   },
        ],
      },
    ],
  },
};
