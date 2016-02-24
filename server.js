'use strict'

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
config.entry.app.unshift('webpack-dev-server/client?http://192.168.4.54:8023', 'webpack/hot/dev-server');
config.plugins.push(new webpack.HotModuleReplacementPlugin());

// 这里配置：请求http://localhost:8011/api，
// 相当于通过本地node服务代理请求到了http://www.haitao.com
var proxy = [{
    path: '/api/*',
    target: 'http://haitao.com',
    host: "haitao.com"
}]
//启动服务
var app = new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot:true,
    historyApiFallback: true,
    proxy:proxy
});
app.listen(8023);