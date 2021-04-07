import path from 'path';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

import postcssFlexbugsFixes from 'postcss-flexbugs-fixes';
import postcssPresetEnv from 'postcss-preset-env';
import postcssNormalize from 'postcss-normalize';

export default {
  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    assetModuleFilename: 'images/[hash][ext][query]'
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },

      {
        test: /\.html$/i,
        loader: 'html-loader'
      },

      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '/'
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
                  postcssFlexbugsFixes(),
                  postcssPresetEnv( {
                    autoprefixer: {
                      flexbox: 'no-2009'
                    },
                    stage: 3
                  } ),
                  postcssNormalize
                ]
              }
            }
          }
        ]
      },

      {
        test: /\.(jpg|png|svg|webp)$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/images/[name][ext][query]'
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
    new CopyWebpackPlugin({
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

    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
    }),

    new HtmlWebpackPlugin({
      template: './public/apps/spaceship-arcade/index.html',
      filename: 'apps/spaceship-arcade/index.html',
    }),

    new HtmlWebpackPlugin({
      template: './public/apps/spaceship-arcade/privacy-policy.html',
      filename: 'apps/spaceship-arcade/privacy-policy.html',
    }),
  ],

  experiments: {
    asset: true
  }
};
