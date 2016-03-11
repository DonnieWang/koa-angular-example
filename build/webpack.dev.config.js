/**
 * Created by donnie on 16/2/26.
 */

var webpack = require('webpack');

var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = require('./webpack.base.config');

config.devtool = 'inline-source-map';//'eval-source-map';

config.entry = {
    index:['./web/scripts/index.js','webpack-dev-server/client?http://0.0.0.0:8080','webpack/hot/only-dev-server']
};

config.plugins = (config.plugins || []).concat([
    new HtmlWebpackPlugin({
        template: './web/index.html'
    }),
    new CopyWebpackPlugin([
        { from: './web/images', to: 'images' }
    ]),
    new ExtractTextPlugin('styles/styles.css', {
        publicPath: '/',
        allChunks: true
    }),
    new webpack.DefinePlugin({
        '__DEV__': true,
        'process.env': {
            'NODE_ENV': JSON.stringify('development')
        }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
]);

module.exports = config;
