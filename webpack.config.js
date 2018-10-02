const HtmlWebPackPlugin = require("html-webpack-plugin");
const autoprefixer = require('autoprefixer');
module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
                loader: 'url-loader',
                options: { limit: 10000, mimetype: 'application/font-woff2', publicPath: '/dist' } },
            {
                test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
                loader: 'url-loader',
                options: { limit: 10000, mimetype: 'application/font-woff', publicPath: '/dist' } },
            {
                test: /\.(ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
                loader: 'file-loader',
                options: { publicPath: '/dist'}
                },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader'
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
                    }
                ]
            },
            {
                test: /\.css/,
                loader: 'css-loader!style!autoprefixer!?browsers=last 12 versions',
            }
        ]
    },
    devtool: 'eval-source-map',
    target:'node',
    plugins: [
        new HtmlWebPackPlugin({
            template: "!!html-loader?interpolate!./src/index.html",
            filename: "../index.html",
            inject: true
        })
    ]
};
