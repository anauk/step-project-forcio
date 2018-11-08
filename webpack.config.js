const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const autoprefixer = require('autoprefixer');
// const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
    mode: 'development', // изменить на 'production' для продакшена
    entry: './src/index.js',
    devtool: 'inline-source-map', // убрать для mode: 'production'
    devServer: { // убрать для mode: 'production'
        contentBase: './dist',
        open: true
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'main.css',
        }),
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Forkio',
            filename: 'index.html',
            template: 'src/index.html'
        })
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    optimization: { // включается только для для mode: 'production'
        minimizer: [
            new TerserPlugin({}),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    module: {
        rules: [
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                }
            },
            {
                test: /\.scss$/,
                use: [

                    /*{
                        loader: MiniCssExtractPlugin.loader // раскомментировать для продакшн
                    },*/
                    {
                        loader: 'style-loader' // закомментировать для продакшн
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                autoprefixer({
                                    browsers:['ie >= 8', 'last 4 version']
                                })
                            ],
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    `file-loader?name=img/[name].[ext]`,
                    {
                        loader: 'image-webpack-loader',
                        options: {

                            mozjpeg: {
                                progressive: false,
                                quality: 75
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            // the webp option will enable WEBP
                            webp: {
                                quality: 75
                            }
                        }
                    },

                ]
            }
        ]
    }
};