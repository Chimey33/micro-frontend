module.exports = {
    preset: 'ts-jest/presets/js-with-ts',
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect', '<rootDir>/jest.setup.js'],
    moduleNameMapper: {
        '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
        '.+\\.(png|svg|jpg|jpeg|gif)$': '<rootDir>/mocks/fileMock.js',
    },
    coverageReporters: ['lcov', 'text'],
    coverageDirectory: 'build/coverage',
    testPathIgnorePatterns: ['<rootDir>/src/testUtils/'],
};
