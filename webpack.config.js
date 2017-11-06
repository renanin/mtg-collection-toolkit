const path = require('path');

module.exports = {
  entry: {
    bundle: [path.resolve(__dirname, 'src', 'main.js')],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      vue: 'vue/dist/vue.js',
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      }, {
        test: /\.js$/,
        loader: 'babel-loader?cacheDirectory',
      }, {
        test: /\.scss$/,
        loader: 'style!css!sass',
      }, {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }, {
        test: /\.(eot|woff|ttf|woff2)$/,
        loader: 'url-loader',
      },
    ],
  },
  externals: {
    electron: 'commonjs electron',
    'simple-sort': 'commonjs simple-sort',
    'read-big-file': 'commonjs read-big-file',
    request: 'commonjs request',
    async: 'commonjs async',
  },
};
