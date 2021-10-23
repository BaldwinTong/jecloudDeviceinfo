module.exports = {
  devServer: {
    open: true,
    port: 3000,
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true, //允许链式调用的换行
      },
    },
  },
};
