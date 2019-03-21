module.exports = {
      configureWebpack: {
            devServer: {
                  proxy: {
                        "/data": {
                              target: "http://chiningmeng.top:3000",
                              pathRewrite: { "^/data": "" },
                        },
                  }
            }
      }
}