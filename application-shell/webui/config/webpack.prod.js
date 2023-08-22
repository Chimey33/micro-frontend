const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const commonConfig = require('./webpack.common');
const moduleFederationConfig = require('./moduleFederation');
const path = require('path')

moduleFederationConfig.remotes = {
    appOne: 'appOne@http://localhost:8081/remoteEntry.js',
    appTwo: 'appTwo@http://localhost:8082/remoteEntry.js',
};

const localProdConfig = {
    mode: 'production',
    plugins: [new CleanWebpackPlugin(), new ModuleFederationPlugin(moduleFederationConfig)],
    output: {
        publicPath: '/',
        path: path.resolve(process.cwd(), 'build/dist'),
        filename: '[name].[contenthash].js',
    },
};

module.exports = merge(commonConfig, prodConfig, localProdConfig);
