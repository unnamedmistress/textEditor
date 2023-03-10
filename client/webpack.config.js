const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        favicon: "./favicon.ico",
        title: 'JATE'
      }),

      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "src-sw.js",
        additionalManifestEntries: [
          { url: '/', revision: null },
          { url: '/index.html', revision: null },
          { url: '/manifest.json', revision: null },
        ],
      }),

      new WebpackPwaManifest({
        name: 'J.A.T.E.',
        short_name:'JATE',
        description: 'Just Another Text Editor', 
        display: 'standalone',
        background_color: '#1e1e1e',
        theme_color: '#1e1e1e',
        start_url: '/',
        publicPath: '/',
        fingerprints: false,
        inject: true,
        icons: [
          {
            src: path.resolve('src/images/logo.png'), 
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'), 
          }
        ], 
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [
                '@babel/plugin-proposal-object-rest-spread',
                '@babel/transform-runtime',
              ],
            },
          },
        },
      ],
    },
  };
};
