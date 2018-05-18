const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
console.log(__dirname)

module.exports = {
  context: path.resolve(__dirname, "../"),
  entry: {
    vuepackage: "./src/vue-package.js",
    app: "./src/main.js",

  },

  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].js"
  },

  module: {

    rules: [{
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/

      },

      {
        test: /\.vue$/,
        loader: "vue-loader"
        // options: {
        //   css: ExtractTextPlugin.extract({
        //     loader: 'css-loader',
        //     fallbackLoader: 'vue-style-loader'
        //   })
        // }
      },

      {
        test: /\.css$/,
        use:  ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },



      {
        test: /\.(png|jpg|gif|svg)$/,
        use:[
          // {
          //   loader: 'url-loader'
          // },
          {
            loader: 'file-loader',
            options: {
              name: '/static/img/[name].[ext]?[hash]'
            }
          }

        ]

      },

      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: '/static/font/[name].[ext]?[hash]'
        }
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin([path.resolve(__dirname, "../dist")]),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, '../dist/index.html'),
      template: path.resolve(__dirname, '../index.html'),
      inject: true
    }),

    new webpack.HotModuleReplacementPlugin(),

    new ExtractTextPlugin({
			filename: "/static/css/[name].css?[hash]-[chunkhash]-[contenthash]-[name]",
			disable: false,
			allChunks: true
		}),

    new webpack.ProvidePlugin({
      $: 'jquery',
      jquery: 'jquery',
      'window.jQuery': 'jquery',
      jQuery: 'jquery'
    })
  ],

  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },

  devServer: {
    contentBase: path.resolve(__dirname, "../dist"),
    compress: true,
    host: "0.0.0.0",
    port: 9000,
    hot: true,
    watchContentBase: true
  },

  node: {
    child_process: 'empty'
  }

}
