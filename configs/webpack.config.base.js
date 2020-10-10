import path from 'path';

import HtmlPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyPlugin from 'copy-webpack-plugin';

import postcssFlexbugsFixes from 'postcss-flexbugs-fixes';
import postcssPresetEnv from 'postcss-preset-env';
import postcssNormalize from 'postcss-normalize';

export default {
  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: 'static/js/bundle.js',
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js', '.css', '.png']
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: 'static/css'
            }
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 3
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  postcssFlexbugsFixes,
                  postcssPresetEnv({
                    autoprefixer: {
                      flexbox: 'no-2009',
                    },
                    stage: 3,
                  }),
                  postcssNormalize
                ]
              }
            }
          },
          'resolve-url-loader'
        ]
      },
      {
        test: /\.(jpg|png|svg|webp)$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/media/[hash][ext][query]'
        }
      },
      {
        test: /\.woff?/,
        type: 'asset/resource',
        generator: {
          filename: 'static/fonts/[hash][ext][query]'
        }
      }
    ]
  },

  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '..', 'public/assets'),
          to: path.resolve(__dirname, '..', 'dist')
        }
      ]
    }),

    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
    }),

    new HtmlPlugin({
      template: './public/index.html',
      filename: 'index.html',
    })
  ],

  experiments: {
    asset: true
  }
};
