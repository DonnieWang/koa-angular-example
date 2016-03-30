/**
 * Created by donnie on 16/2/26.
 */
var path = require('path');

var webpack = require('webpack');

var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        index:['./web/scripts/index.js']
    },
    resolve: {
        root: "../",
        modulesDirectories: ['node_modules','node_modules/bootstrap/dist/css'],
        extensions: ['', '.js', '.css'],
        alias: {
            'ngRoute': 'angular-route'
        }
    },
    output: {
        path: path.join(__dirname, '../public'),
        filename: 'scripts/[name].js',
        publicPath: '/'
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loaders: ['babel']
            },
            {
                test: /\.html$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'html'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
            },
            {
                test: /\.(png|jpe?g)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'url?name=[name].[ext]&limit=8192'
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url',
                query : {
                    limit : 10000,
                    mimetype : 'application/font-woff',
                    name : 'fonts/[name]_[hash].[ext]'
                }
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url',
                query : {
                    limit : 10000,
                    mimetype : 'application/octet-stream',
                    name : 'fonts/[name]_[hash].[ext]'
                }
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file',
                query : {
                    limit : 10000,
                    name : 'fonts/[name]_[hash].[ext]'
                }
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url',
                query : {
                    limit : 10000,
                    mimetype : 'image/svg+xml',
                    name : 'fonts/[name]_[hash].[ext]'
                }
            }
        ]
    },
    plugins: [
    ]
};
