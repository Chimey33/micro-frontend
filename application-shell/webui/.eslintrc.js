module.exports = {
    plugins: [
        'testing-library',
        'jest-dom',
        'react-hooks'
    ],
    extends: [
        'plugin:prettier/recommended',
        'plugin:testing-library/recommended',
        'plugin:jest-dom/recommended',
        'prettier/@typescript-eslint',
        'plugin:react/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:testing-library/react'
    ],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    parser: '@typescript-eslint/parser',
    rules: {
        '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'react/prop-types': 'off',
    },
    overrides: [
        {
            files: ['*.js'],
            rules: {
                '@typescript-eslint/explicit-function-return-type': 'off',
                '@typescript-eslint/explicit-member-accessibility': 'off'
            }
        },
        {
            files: ['webpack*.js', 'moduleFederation.js'],
            rules: {
                '@typescript-eslint/no-var-requires': 'off',
            },
        },
    ],
    settings: {
        react: {
            version: 'detect',
        },
        linkComponents: [
            { name: 'Link', linkAttribute: 'to' },
        ],
    }
};
