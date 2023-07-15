const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: './src/app.js', // Replace with your entry file

  output: {
    filename: 'bundle.js', // Replace with your desired output filename
    path: path.resolve(__dirname, 'dist'), // Replace with your desired output directory
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules|test/, // Exclude the test folder
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },

  optimization: {
    minimizer: [
      new TerserPlugin(), // Minify/uglify the build output
    ],
  },
  target: 'node',
};
