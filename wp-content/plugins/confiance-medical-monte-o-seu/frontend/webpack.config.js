const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
        path: path.resolve(__dirname, 'public'),
        publicPath: '/',
        filename: 'bundle-conf-med.js'
    },
    devServer: {
      contentBase: path.resolve(__dirname, 'public'),
    }
    ,
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          }
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            {loader: 'style-loader'},
            {loader: 'css-loader'},
          ]
        },
        {
          test: /.*\.(gif|png|jpe?g|webp|svg)$/i,
          use: {
            loader: 'file-loader',
            options: {
              outputPath: 'images',
              name: '[name].[ext]',
            },
          }
        }
      ]
    }
}