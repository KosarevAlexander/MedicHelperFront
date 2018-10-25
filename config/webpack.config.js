const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const resolve = (packageName) => {
    return path.resolve(__dirname, '../node_modules/', packageName);
};

const postCssLoader = {
    loader: resolve('postcss-loader'),
    options: {
        plugins: {
            'autoprefixer': { browsers: ['last 5 versions'] }
        }
    }
};

const plugins = [
    new ExtractTextPlugin({ filename: '[name].css', disable: false, allChunks: true }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru/),
    new ManifestPlugin(),
    new webpack.DefinePlugin({
        __BUILD_NUMBER__: JSON.stringify(""),
        __APP_NAME__: JSON.stringify(process.env.npm_package_config_appName),
    })
];

module.exports = {
    entry: path.resolve(__dirname, '../src/index.js'),
    devtool: 'source-map',
    stats: { children: false },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist')
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: [
                        resolve('babel-preset-react'),
                        [resolve('babel-preset-es2015'), { 'modules': false }],
                        resolve('babel-preset-stage-0')
                    ],
                    plugins: [
                        resolve("babel-plugin-transform-decorators-legacy"),
                        resolve("babel-plugin-transform-class-properties")
                    ]
                }
            },
            {
                test: /(?!\.m)..\.less$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        { loader: resolve('css-loader'), options: { sourceMap: true } },
                        { loader: resolve('less-loader'), options: { sourceMap: true } },
                    ]
                })
            },
            {
                test: /\.m\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: resolve('style-loader'),
                    use: [
                        {
                            loader: resolve('css-loader'), query: {
                                modules: true,
                                importLoaders: 1,
                                localIdentName: '[name]__[local]___[hash:base64:5]',
                                sourceMap: true
                            }
                        },
                        { loader: resolve('less-loader') },
                    ]
                })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: resolve('style-loader'),
                    use: [
                        { loader: resolve('css-loader'), options: { sourceMap: true } },
                    ]
                })
            },
            {
                test: /\.(jpe?g|png|gif)|(?!\.m)(?!\.i)..\.svg$/i,
                loader: 'file-loader',
                options: {
                    name: '[name]-[hash].[ext]',
                    outputPath: '../dist/imgs/'
                }
            },
            {
                test: /\.i\.svg$/,
                loader: 'svg-inline-loader',
                options: {
                    classPrefix: true
                }
            },
            {
                test: /\.(eot|woff|woff2|ttf)$/,
                loader: 'url-loader',
                options: {
                    limit: 30000,
                    name: '[name]-[hash].[ext]',
                    outputPath: '../dist/fonts/'
                }
            },
            {
                test: /\.m\.svg$/,
                loader: 'svg-sprite-loader',
                options: {
                    symbolId: '[name]__[hash]'
                }
            },
            {
                test: /\.hbs$/,
                loader: 'handlebars-loader'
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            }
        ]
    },
    resolve: {
        modules: [
            path.resolve(__dirname, '../../../node_modules'),
            path.resolve(__dirname, '../node_modules')
        ],
        alias: {
            'inputmask.dependencyLib': 'jquery.inputmask/dist/inputmask/inputmask.dependencyLib.jquery.js',
            inputmask: 'jquery.inputmask/dist/inputmask/inputmask.js',
        },
        extensions: [".js", ".json"]
    },
    resolveLoader: {
        modules: [
            path.resolve(__dirname, '../../../node_modules'),
            path.resolve(__dirname, '../node_modules')
        ],
        alias: {
            'inputmask.dependencyLib': 'jquery.inputmask/dist/inputmask/inputmask.dependencyLib.jquery.js',
            inputmask: 'jquery.inputmask/dist/inputmask/inputmask.js'
        },
        extensions: [".js", ".json"]
    },
    plugins: [...plugins]
};