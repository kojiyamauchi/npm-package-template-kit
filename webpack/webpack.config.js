const webpack = require('webpack')

module.exports = {
  mode: 'production',
  entry: './base/core.js', // or './base/core.tsx',
  output: {
    path: __dirname + 'js/',
    filename: '_core.js'
  },

  devtool: "source-map",

  module: {
    rules: [
      // If Using Riot.js
      {
        test: /\.tag$/,
        enforce: 'pre',
        exclude: /node_modules/,
        use: [
        {
          loader: 'riot-tag-loader',
          options: {
            debug: true
          }
        }]
      },
      {
        test: /\.js|\.ts|\.tag$/,
        enforce: 'post',
        exclude: /node_modules/,
        use: [
        {
          loader: 'babel-loader',
          options: {
            presets: 'es2015-riot'
          }
        }]
      },
      // If Using Riot.js End.
      // ES6 & React & TypeScript Compile.
      // If Don't Use TypeScript, Delete 'awesome-typescript-loader'.
      {
        test: /\.js$/,
        enforce: "pre",
        loader: "source-map-loader"
      },
      {
        test: /\.js|\.ts|\.tsx$/,
        exclude: /node_modules/,
        loader: ['babel-loader', 'awesome-typescript-loader']
      },
      // ES6 & React & TypeScript Compile End.
      // Import Json File.
      {
        test: /\.json$/,
        exclude: /node_modules/,
        loader: 'json-loader'
      }
      // Import Json File End.
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.tag', 'tsx', 'json']
  },
  plugins: [
    new webpack.ProvidePlugin({
      riot: 'riot'
    })
  ]
}