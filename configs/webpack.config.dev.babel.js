import {merge} from 'webpack-merge';

import baseConfig  from './webpack.config.base.js';

export default merge(baseConfig, {
  devtool: 'cheap-module-source-map',

  mode: 'development'
});
