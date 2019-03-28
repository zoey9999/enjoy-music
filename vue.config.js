module.exports = {
      configureWebpack: {
            devServer: {
                  proxy: {
                        "/data": {
                              // target: "http://chiningmeng.top:3000",
                              target: "http://39.108.3.88:3000",
                              pathRewrite: { "^/data": "" },
                        },
                  }
            }
      }
}