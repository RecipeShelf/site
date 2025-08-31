import webpack from "webpack";
import path from "path";

export default {
  module: {
    rules: [
      {
        test: /\.((png)|(eot)|(woff)|(woff2)|(ttf)|(svg)|(gif))(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: "file-loader",
          options: {
            name: '[hash].[ext]'
          }
        }]
      },
      {
        test: /\.json$/,
        type: "json"
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: [{
          loader: "babel-loader",
          options: {
            cacheDirectory: true
          }
        }]
      }
    ]
  },

  plugins: [
    new webpack.ProvidePlugin({
      fetch: ["whatwg-fetch", "fetch"]
    })
  ],

  context: path.join(__dirname, "src"),
  entry: {
    app: ["./js/app"]
  },
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/",
    filename: "[name].js"
  },
  externals: [/^vendor\/.+\.js$/]
};
