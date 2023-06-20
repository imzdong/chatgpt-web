const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/ai': {
        target: "http://localhost:9088",
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: {
          '^/ai': '/ai'
        }
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        // additionalData: `@import "@/styles/variables.scss";`
      }
    }
  },
  chainWebpack: (config) => {
    // 添加对 vue-advanced-chat 的自定义元素支持
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => {
        options.compilerOptions = {
          isCustomElement: (tag) => tag === 'vue-advanced-chat',
        };
        return options;
      });
  },
})

/**
是的，如果 Vue 部署在 192.168.1.123，Go 部署在 192.168.1.124，则可以在 Vue 项目中将 target 设置为 http://192.168.1.124，从而让 Vue 项目代理到 Go 项目的接口。这里的目的是为了让浏览器认为请求的是同一个域名下的资源，从而避免跨域访问的问题。
具体地说，当浏览器发送一个跨域请求时，会先向目标服务器发送一个 OPTIONS 请求，询问目标服务器是否允许跨域访问。如果目标服务器允许跨域访问，则会在响应头中添加一些 CORS 相关的头部信息，例如 Access-Control-Allow-Origin 表示允许跨域访问的域名，Access-Control-Allow-Methods 表示允许的请求方法，Access-Control-Allow-Headers 表示允许的请求头等等。这些头部信息告诉浏览器，该服务器允许跨域访问，因此浏览器会将响应返回给前端。
如果目标服务器不允许跨域访问，则会在响应头中添加 Access-Control-Allow-Origin: *，表示不允许跨域访问。这时，浏览器会拦截该响应，并返回一个跨域错误。
由于跨域访问涉及到浏览器的安全机制，因此需要在目标服务器中设置一些响应头信息，以允许跨域访问。而使用代理的方式，则是通过将请求代理到同一个域名下的地址，从而绕过了浏览器的安全机制，实现了跨域访问的目的。这里的思路是，在 Vue 项目中设置代理规则，将请求代理到 Go 项目的地址上，然后再通过 Go 项目的服务器来访问后端接口，从而绕过了浏览器的跨域限制。  
 */

