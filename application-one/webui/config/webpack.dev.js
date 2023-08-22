const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const moduleFederationConfig = require('./moduleFederation');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

moduleFederationConfig.remotes = {
    appTwo: 'appTwo@http://localhost:8082/remoteEntry.js',
};

const localDevConfig = {
    mode: 'development',
    devtool: 'eval-source-map',
    output: {
        publicPath: 'http://localhost:8081/',
        uniqueName: 'appOne'
    },
    devServer: {
        port: 8081,
        historyApiFallback: true,

    },
    plugins: [new ModuleFederationPlugin(moduleFederationConfig)],
};

module.exports = merge(commonConfig, localDevConfig);
