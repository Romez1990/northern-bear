const path = require('path');

module.exports = {
  outputDir: 'static',
  productionSourceMap: false,
  configureWebpack: {
    entry: './resources/main.ts',
    devtool: 'inline-cheap-module-source-map',
    resolve: {
      alias: {
        '@': path.join(__dirname, 'resources'),
      },
    },
  },
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
      },
    },
  },
};
