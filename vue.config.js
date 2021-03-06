const path = require("path");

const proxyOpt = {
  changeOrigin: true,
  target: "http://competition-manager.oo/"
};

module.exports = {
  lintOnSave: true,

  devServer: {
    proxy: {
      "/api": proxyOpt,
      "/packages": proxyOpt,
      "/vendor": proxyOpt,
      "/oauth": proxyOpt,
      "/storage": proxyOpt
    }
  },

  configureWebpack: config => {
    config.resolve.alias["#"] = path.resolve(__dirname, "src/modules");
    config.resolve.alias["assets"] = path.resolve(__dirname, "src/assets");
  },

  baseUrl: undefined,
  outputDir: undefined,
  assetsDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: undefined,
  parallel: undefined,

  css: {
    sourceMap: true
  }
};
