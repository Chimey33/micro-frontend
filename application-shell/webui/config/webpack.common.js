const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports =  {
    resolve: {
        extensions: ['.js', '.tsx', '.jsx', '.ts'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                // Exclude global css from postcss-prefix-selector
                test: /\.global\.css$/,
                exclude: [/\.module\.css$/],
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                // Just CSS (no modules)
                test: /\.css$/,
                exclude: [/\.module\.css$/, /\.global\.css$/],
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: { publicPath: '' },
                    },
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 1 },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: {
                                    'postcss-prefix-selector': {
                                        prefix: '.sh',
                                        transform(prefix, selector, prefixedSelector) {
                                            return selector.match(/^(html|body|:root)/)
                                                ? selector.replace(/^([^\s]*)/, `$1 ${prefix}`)
                                                : prefixedSelector;
                                        },
                                    },
                                },
                            },
                        },
                    },
                ],
            },
            {
                // CSS Modules
                test: /\.module\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        },
                    },
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [{ loader: 'file-loader?name=fonts/[name].[ext]' }],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(process.cwd(), 'public/index.html'),
        }),
        new MiniCssExtractPlugin({ filename: '[name]-[contenthash:8].css' }),
    ],
}
