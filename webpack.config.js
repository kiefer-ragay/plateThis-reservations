const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');

const entryPath = path.join(__dirname, 'client', 'src', 'components', 'App.jsx');
const outputPath = path.join(__dirname, 'client', 'dist');

module.exports = {
  entry: entryPath,
  output: {
    path: outputPath,
    filename: 'bundle.js',
  },
  plugins: [
    new CompressionPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
