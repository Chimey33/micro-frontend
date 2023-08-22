const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const moduleFederationConfig = require('./moduleFederation');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

moduleFederationConfig.remotes = {
    appOne: 'appOne@http://localhost:8081/remoteEntry.js',
    appTwo: 'appTwo@http://localhost:8082/remoteEntry.js',
};

const localDevConfig = {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        port: 8080,
        historyApiFallback: true,
    },
    output: {
        publicPath: '/',
    },
    plugins: [new ModuleFederationPlugin(moduleFederationConfig)],
};

module.exports = merge(commonConfig, localDevConfig);
