var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: path.join(__dirname, './src'),
    devtool: 'inline-source-map',
    entry: [
        'webpack-hot-middleware/client?reload=true',
        './index.js'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js',
        publicPath: '/'
    },
    mode: 'development',
    resolve: {
        enforceExtension: false,
        extensions: ['.js', '.jsx', '.json', '.scss'],
        alias: {
            '@actions': path.join(__dirname, './src/actions'),
            '@components': path.join(__dirname, './src/components')
        }
    },
    devServer: {
        hot: true,
        historyApiFallback: true
    },
    module: {
        rules: [{
                test: [/\.js?$/, /\.jsx?$/],
                loaders: ['babel-loader'],
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader", "sass-loader", {
                    loader: 'postcss-loader',
                    options: {
                        ident: 'postcss',
                        plugins: [
                            require('autoprefixer')
                        ]
                    }
                }]
            },
            {
                test: /\.png$/i,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true,
                        },
                    },
                ],
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './index.html')
        })
    ]
}