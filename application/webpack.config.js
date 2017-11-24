const path = require('path');

module.exports = {
  context: __dirname,

  entry: {
    main: ['./index.html', path.join(__dirname, 'src/app.jsx')],
    'pdfjs-worker': 'pdfjs-dist/build/pdf.worker.entry',
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]-bundle.js',
    publicPath: '/',
    pathinfo: true,
  },

  devtool: '#eval-cheap-module-source-map',

  devServer: {
    historyApiFallback: {
      disableDotRule: true,
    },
    compress: true,
    proxy: {
      '/api/**': {
        target: 'http://localhost:8080',
        secure: false,
      },
    },
  },

  resolve: {
    extensions: ['*', '.js', '.jsx', '.json', '.scss', '.css'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: ['babel-loader', 'eslint-loader'],
      }, {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      }, {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader', 'postcss-loader'],
      }, {
        test: /\.html$/,
        loader: 'file-loader?name=[name].[ext]',
      }, {
        test: /\.(jpg|png|svg)(\?v=[0-9].[0-9].[0-9])?$/,
        loader: 'file-loader?name=images/[name].[ext]',
      }, {
        test: /\.(woff|woff2|ttf|eot)(\?v=[0-9].[0-9].[0-9])?$/,
        loader: 'file-loader?name=fonts/[name].[ext]',
      },
    ],
  },

};
