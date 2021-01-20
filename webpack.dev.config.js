module.exports = {
  devServer: {
    port: 8089,
    proxy: {
      '/api': {
        target: 'https://api.ustc.design/',
        pathRewrite: {'^/api': ''},
        changeOrigin: true
      }
    }
  }
}
