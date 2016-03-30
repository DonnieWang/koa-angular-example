/**
 * Created by donnie on 16/2/26.
 */

var webpack = require('webpack');

var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = require('./webpack.base.config.js');

config.devtool = 'inline-source-map';//'eval-source-map';

config.entry = {
    index:['./web/scripts/index.js','webpack-dev-server/client?http://0.0.0.0:8090','webpack/hot/only-dev-server']
};

config.plugins = [
    new HtmlWebpackPlugin({
        template: './web/index.html',
        //inject: false
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
];

config.devServer = {
    contentBase:'./public',
    port:8090,
    proxy:[{
        path:/^\/([^sockjs\-node]).*$/,
        target: 'http://127.0.0.1:8080'
    }],
    inline: true,
    historyApiFallback: true,
    colors: true,
    stats: 'normal'
};

module.exports = config;
