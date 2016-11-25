var path = require('path');

module.exports = {
    entry: './app.js',
    devtool: 'sourcemaps',
    cache: true,
    debug: true,
    output: {
        path: "../public/",
        filename: '../public/js/Main.js',
        publicPath: '/'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)(\?\w+)?$/,
                loader: 'url?limit=10000&name=fonts/[name].[ext]'
            },
            {
                test: /\.scss$/,
                loader: 'style!css?sourceMap!sass?sourceMap'
            }
        ]
    },
    plugins: [
    ],
    resolve: {
        alias: {
            "ag-grid-root": __dirname + "/node_modules/ag-grid",
            "bootstrap": __dirname + "/node_modules/bootstrap"
        }
    }
};