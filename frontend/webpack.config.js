// frontend/webpack.config.js

const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = {

    // Where Webpack looks to load your JavaScript
    entry: {
        main: path.resolve(__dirname, 'src/index.js'),
    },

    mode: 'development',

    // Where Webpack spits out the results
    output: {
        path: path.resolve(__dirname, '../backend/seeds/static/seeds/build'),
        filename: '[name].js',
    },

    plugins: [
        // Don't output new files if there is an error
        new webpack.NoEmitOnErrorsPlugin(),
        // use Dotenv to access environment vars with process.env.ENV_VAR
        new Dotenv()
    ],

    // Where find modules that can be imported (eg. React) 
    resolve: {
        extensions: ['*', '.js', '.jsx'],
        modules: [
            path.resolve(__dirname, 'src'),
            path.resolve(__dirname, 'node_modules'),
        ],
    },

    // Tell webpack to read JS with Babel
    // "for any file ending with .js, use babel-loader
    // on that file, expect for anything in node_modules".
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack']
            }
        ]
    }


    }
