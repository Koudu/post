const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    main: "./src/main.js",
    user: "./src/user.js",
  },
  resolve: {
    extensions: [".js", ".ts"],
  },
  output: {
    path: path.resolve(__dirname, "build", "target"),
    publicPath: "/",
    filename: "[name].bundle.js",
    chunkFilename: "[id].bundle_[chunkhash].js",
    sourceMapFilename: "[file].map",
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "public/index.html",
      inject: "body",
      chunks: ["main"],
    }),
    new HtmlWebpackPlugin({
      filename: "user.html",
      template: "public/user.html",
      inject: "body",
      chunks: ["user"],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(t|j)s$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[name][ext]",
        },
      },
    ],
  },
  devServer: {
    compress: true,
    port: 9100,
    hot: true,
  },
};
