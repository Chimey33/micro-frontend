const { merge } = require('webpack-merge');

const localModuleFedConfig = {
    name: 'shell',
    filename: 'remoteEntry.js',
    shared: {
        react: {
            singleton: true,
            requiredVersion: '~18.2.0',
        },
        'react-dom': {
            singleton: true,
            requiredVersion: '~18.2.0',
        },
        '@mui/styles': {
            singleton: true,
            requiredVersion: '~5.14.5',
        },
        '@emotion/react': {
            singleton: true,
            requiredVersion: '~11.11.1',
        },
        '@mui/lab': {
            singleton: true,
            requiredVersion: '5.0.0-alpha.140',
        }
    },
};

module.exports = merge(localModuleFedConfig);
