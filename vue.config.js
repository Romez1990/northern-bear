module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/northern-bear/' : '/',
  productionSourceMap: false,
  configureWebpack: {
    devtool: 'inline-cheap-module-source-map',
  },
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
      },
    },
  },
};
