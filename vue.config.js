module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/PrincessEntertainment/" : "/",
  css: {
    loaderOptions: {
      sass: {
        data: '@import "~@/style/_variable.scss";'
      }
    }
  },
  chainWebpack: config => {
    if (process.env.NODE_ENV === "development") {
      -config.output.filename("[name].[hash].js").end();
    }
  }
};
