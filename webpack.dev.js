const path = require('path')
const {merge} = require('webpack-merge')
const common = require('./webpack.common')
const HotModuleReplacementPlugin = require('ho')

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
      port: 8080,
      hot: true,
    },
})