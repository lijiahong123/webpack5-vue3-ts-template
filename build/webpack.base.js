const path = require("path");
const { getStyleLoader, getCssLoaders, setEnv } = require("./util");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader").VueLoaderPlugin;
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");

const ENV = setEnv(); // 设置环境变量

/**
 * @type {import('webpack').Configuration}
 * @description webpack基础配置
 */
module.exports = {
  entry: path.resolve(__dirname, "../src/main.ts"), // 入口文件
  output: {
    path: path.resolve(__dirname, "../dist"), // 打包后输出目录
    filename: "static/js/[name].[contenthash:6].js",
    clean: true, // 清空上一次打包的输出目录， webpack5内置
    publicPath: "/", // 打包后的资源路径前缀
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src"), // @指向src目录
      vue$: "vue/dist/vue.runtime.esm-bundler.js", // vue的运行时模块别名
    },
    extensions: [".ts", ".js", ".vue", ".json"], // 解析文件后缀名
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"), // 模板文件
      title: "webpack5-vue3-ts", // 页面标题
      favicon: path.resolve(__dirname, "../public/favicon.ico"), // 页面图标
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../public"),
          to: path.resolve(__dirname, "../dist"),
          toType: "dir",
          globOptions: {
            ignore: ["*/index.html"], // 忽略index.html文件
          },
        },
      ],
    }),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true, // 开启options api 解除控制台警告
      __VUE_PROD_DEVTOOLS__: false, // 生产环境不启用devtools 解除控制台警告
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false, // 禁用生产中水合不匹配的详细警告
      BASE_URL: JSON.stringify(ENV.BASE_URL || "/"), // 设置基础路径
    }),
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
        ],
      },
      {
        oneOf: [
          {
            test: /\.css$/i,
            exclude: [/node_modules/, /\.module\.css$/i],
            use: [getStyleLoader(), getCssLoaders(), "postcss-loader"],
          },
          {
            test: /\.module\.css$/i,
            exclude: [/node_modules/],
            use: [
              getStyleLoader(),
              getCssLoaders(true),
              "postcss-loader", // 处理 CSS 前缀
            ],
          },
          {
            test: /\.sc|ass$/i,
            exclude: /node_modules/,
            use: [
              getStyleLoader(),
              getCssLoaders(),
              "postcss-loader", // 处理 CSS 前缀
              "sass-loader", // 解析 Sass 文件
              {
                loader: "style-resources-loader",
                options: {
                  patterns: [
                    path.resolve(
                      __dirname,
                      "../src/assets/styles/variables.scss"
                    ),
                  ], // 引入全局变量和混入
                },
              },
            ],
          },
        ],
      },
      {
        oneOf: [
          {
            test: /\.(png|jpe?g|gif|webp)(\?.*)?$/i,
            type: "asset", // 资源类型
            generator: {
              filename: "static/images/[name].[contenthash:6][ext]", // 图片文件名
            },
            parser: {
              dataUrlCondition: {
                maxSize: 10 * 1024, // 小于10kb的图片转为base64格式
              },
            },
          },
          {
            test: /\.(svg|ico)$/i,
            type: "asset/resource", // svg和ico文件
            generator: {
              filename: "static/images/[name].[contenthash:6][ext]", // 图片文件名
            },
          },
          {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, // 字体
            type: "asset/resource", // 资源类型
            generator: {
              filename: "static/fonts/[name].[contenthash:6][ext]", // 字体文件名
            },
          },
          {
            test: /\.json$/i,
            type: "asset/resource", // json文件
            generator: {
              filename: "static/json/[name].[contenthash:6][ext]", // json文件名
            },
          },
          {
            test: /\.(mp3|wav|flac|aac|ogg)$/,
            type: "asset/resource", // 资源类型
            generator: {
              filename: "static/audio/[name].[contenthash:6][ext]", // 音频文件
            },
          },
          {
            test: /\.(mp4|avi|mkv|flv|wmv|3gp)$/,
            type: "asset/resource", // 资源类型
            generator: {
              filename: "static/video/[name].[contenthash:6][ext]", // 视频文件名
            },
          },
        ],
      },
    ],
  },
};
