const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: {
        main: path.resolve(__dirname, 'src', 'index.js'),
    },
    plugins: [
        // Don't output new files if there is an error
        new webpack.NoEmitOnErrorsPlugin(),
        // use Dotenv to access environment vars with process.env.ENV_VAR
        new Dotenv()
    ],
    output: {
        path: path.resolve(__dirname, '..', 'backend', 'seeds', 'static','seeds', 'build'),
        filename: '[name].bundle.js',
    },

    // Where to find modules that can be imported (eg. React) 
    resolve: {
        extensions: ['*', '.js', '.jsx'],
        modules: [
            path.resolve(__dirname, 'src'),
            path.resolve(__dirname, 'node_modules'),
        ],
    },

    // Tell webpack to read JS with Babel
    // "for any file ending with .js or .jsx, use babel-loader
    // on that file, excluding anything in node_modules".
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