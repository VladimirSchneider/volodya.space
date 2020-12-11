import webpack from 'webpack';
import {merge } from 'webpack-merge';
import baseConfig from './webpack.config.base';

import TerserJsPlugin from 'terser-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';

export default merge(baseConfig, {
  devtool: 'source-map',

  mode: 'production',

  optimization: {
    minimizer: [
      new TerserJsPlugin(),
      new OptimizeCSSAssetsPlugin({}),
    ]
  }
});
