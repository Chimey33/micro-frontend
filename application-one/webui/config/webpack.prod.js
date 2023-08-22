const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const commonConfig = require('./webpack.common');
const moduleFederationConfig = require('./moduleFederation');

const localProdConfig = {
    mode: 'production',
    output: {
        path: path.resolve(process.cwd(), 'build/dist'),
        filename: '[name].[contenthash].js',
        publicPath: '/<context-path>/',
    },
    plugins: [new CleanWebpackPlugin(), new ModuleFederationPlugin(moduleFederationConfig)],
};

module.exports = merge(commonConfig, localProdConfig);
