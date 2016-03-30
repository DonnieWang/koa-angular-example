/**
 * Created by donnie on 16/2/26.
 */

var webpack = require('webpack')
var path = require('path');

var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var Clean = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = require('./webpack.base.config.js')

config.devtool = 'inline-source-map';//'cheap-module-source-map';

config.plugins = [
    new Clean(['public'],{
        root: path.join(__dirname, '../'),
        verbose: true
    }),
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
        'process.env': {
            NODE_ENV: '"production"'
        }
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //     compress: {
    //         warnings: false
    //     }
    // }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin()
];

module.exports = config
