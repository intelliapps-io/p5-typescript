const path = require("path"),
  HtmlWebpackPlugin = require("html-webpack-plugin"),
  tsImportPluginFactory = require('ts-import-plugin'),
  webpack = require("webpack"); 

const PATHS = {
  SRC: path.join(__dirname, "src"),
  DIST: path.join(__dirname, "dist")
};

module.exports = {
  mode: "development",
  entry: {
    app: [PATHS.SRC],
  },
  output: {
    path: PATHS.DIST,
    publicPath: "/",
    filename: "js/[name].[chunkhash].bundle.js",
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"]
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [tsImportPluginFactory( /** options */)]
          }),
          compilerOptions: {
            module: 'es2015'
          }
        },
        exclude: /node_modules/
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve("index.html"),
    })
  ]
};