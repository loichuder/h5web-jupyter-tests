const path = require("path");

module.exports = {
  mode: "none",
  entry: "./src/main.ts",
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "lib"),
    libraryTarget: "umd",
    library: "app-to-import",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "awesome-typescript-loader",
            options: {
              exclude: /node_modules/,
              configFileName: "./tsconfig.build.json",
            },
          },
        ],
      },
      {
        test: /\.module\.css$/,
        use: [
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
        ],
      },
    ],
  },
};
