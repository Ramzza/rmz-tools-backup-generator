import path, { dirname } from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
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
