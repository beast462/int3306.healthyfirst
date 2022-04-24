/* eslint-disable */

const CopyPlugin = require('copy-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const { join, resolve } = require('path');
const tsConfig = require('./tsconfig.app.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dependencies = require('../../package.json').dependencies;

const __root = resolve(__dirname, '..', '..');
const isDev = process.env.NODE_ENV === 'development';
const outDir = resolve(__dirname, tsConfig.compilerOptions.outDir);

function getDep(name) {
  return dependencies[name].replace('^', '').trim();
}

const prodDependencies = {
  react: [
    `https://unpkg.com/react@${getDep('react')}/umd/react.production.min.js`,
    'global',
    'crossorigin',
    'anonymous',
  ],
  'react-dom': [
    `https://unpkg.com/react-dom@${getDep(
      'react-dom',
    )}/umd/react-dom.production.min.js`,
    'global',
    'crossorigin',
    'anonymous',
  ],
  redux: [
    `https://unpkg.com/redux@${getDep('redux')}/dist/redux.min.js`,
    'global',
    'crossorigin',
    'anonymous',
  ],
  'react-redux': [
    `https://unpkg.com/react-redux@${getDep(
      'react-redux',
    )}/dist/react-redux.min.js`,
    'global',
    'crossorigin',
    'anonymous',
  ],
  'react-router': [
    `https://unpkg.com/react-router@${getDep(
      'react-router',
    )}/umd/react-router.production.min.js`,
    'global',
    'crossorigin',
    'anonymous',
  ],
};

module.exports = {
  entry: join(__dirname, 'src', 'index.tsx'),
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    modules: [join(__dirname, 'src'), join(__root, 'node_modules')],
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  context: __dirname,
  mode: isDev ? 'development' : 'production',
  devtool: isDev ? 'source-map' : false,
  output: {
    path: outDir,
    publicPath: '/',
    filename: 'main.js',
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(png|jpg|gif|webp|woff|woff2)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(svg)$/,
        use: ['svg-inline-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  externalsType: 'script',
  externals: isDev ? {} : prodDependencies,
  optimization: {
    minimize: !isDev,
    minimizer: [
      new TerserWebpackPlugin({
        test: /\.js(\?.*)?$/,
        parallel: 1,
        terserOptions: {
          compress: true,
          sourceMap: false,
          format: {
            comments: false,
          },
        },
      }),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: join(__dirname, 'index.html'),
      inject: true,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: join(__dirname, 'public'),
          to: join(outDir, 'public'),
          noErrorOnMissing: true,
        },
      ],
    }),
  ],
};
