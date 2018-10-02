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
        }),
        new webpack.ProvidePlugin({
            $: 'jquery'
        })
    ]
};
