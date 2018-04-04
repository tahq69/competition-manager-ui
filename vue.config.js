const proxyOpt = {
  changeOrigin: true,
  target: "http://competition-manager.oo/",
}

module.exports = {
  lintOnSave: true,
  devServer: {
    proxy: {
      "/api": proxyOpt,
      "/packages": proxyOpt,
      "/vendor": proxyOpt,
      "/oauth": proxyOpt,
      "/storage": proxyOpt,
    }
  }
}
