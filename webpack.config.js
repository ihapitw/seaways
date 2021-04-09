const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const PACKAGE = require('./package.json')

development = {
  target: 'web',
  entry: './dev/index.js',
  output: {
    publicPath: '',
    path: path.resolve(__dirname, 'dist'),
    filename: 'seaways.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'dev/') + '/index.html',
      filename: path.resolve(__dirname, 'dist') + '/index.html'
    }),
    new webpack.DefinePlugin({
      APP_MODE: 'development',
      APP_VERSION: JSON.stringify(PACKAGE.version)
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist/'),
    compress: true,
    inline: true,
    writeToDisk: false,
    overlay: true,
    clientLogLevel: 'warning',
    host: '0.0.0.0',
    port: 7000,
    open: true,
    hot: true
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: { loader: 'html-loader' }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'eslint-loader'
          }
        ]
      }
    ]
  }
}
const production = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'seaways.js',
    library: 'seaways',
    libraryTarget: 'umd',
    libraryExport: 'default',
    globalObject: 'this',
    clean: true
  },
  plugins: [
    new webpack.DefinePlugin({
      APP_MODE: 'production',
      APP_VERSION: JSON.stringify(PACKAGE.version)
    }),
    new webpack.BannerPlugin(
      `seaways ${PACKAGE.version}\nAuthor: ${
        PACKAGE.author
      }\nSource: ${PACKAGE.repository.url
        .replace('git+', '')
        .replace('.git', '')}`
    )
  ],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules|bower_components)/,
        use: 'babel-loader'
      }
    ]
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        extractComments: false,
        terserOptions: {
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        }
      })
    ]
  }
}
module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    console.info('development')
    return development
  }
  if (argv.mode === 'production') {
    console.info('production')
    return production
  }
}
