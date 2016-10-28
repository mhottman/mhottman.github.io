'use strict';
var webpack = require('webpack');
var path = require('path');

var entry = path.resolve(__dirname, './app');
var output = path.resolve(__dirname, './public');

var config = {
    entry: entry + '/main.js',
    output: {
        path: output,
        filename: '/bundle.js'
    },
    module : {
        loaders : [{
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        },
        {
            test: /\.html?$/,
            loader: 'underscore-template-loader'
        }],
    },
    plugins: [
        new webpack.ProvidePlugin({
            _: "underscore"
        })
    ]
}



module.exports = config;
