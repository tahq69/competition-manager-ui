const serverUrl = "http://competition-manager.oo/"

module.exports = {
  lintOnSave: true,
  devServer: {
    proxy: {
      "/api": {
        changeOrigin: true,
        target: serverUrl,
      },
      "/packages": {
        changeOrigin: true,
        target: serverUrl,
      },
      "/vendor": {
        changeOrigin: true,
        target: serverUrl,
      },
      "/oauth": {
        changeOrigin: true,
        target: serverUrl,
      },
      "/storage": {
        changeOrigin: true,
        target: serverUrl,
      },
    }
  }
}
