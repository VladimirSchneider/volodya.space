import TerserJsPlugin from 'terser-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';

import {merge} from 'webpack-merge';

import baseConfig  from './webpack.config.base.js';

export default merge(baseConfig, {
  devtool: 'source-map',

  mode: 'production',

  module: {
    rules: [
      {
        test: /\.(jpg|png|svg|webp)$/,
        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              },
              webp: {
                quality: 75
              }
            }
          }
        ]
      }
    ]
  },

  optimization: {
    minimizer: [
      new TerserJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        terserOptions: {
          output: {
            comments: false,
          },
        },
        extractComments: false,
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  }
});
