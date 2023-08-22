import {
    BOOTSTRAPPING,
    getAppStatus,
    LOADING_SOURCE_CODE,
    LOAD_ERROR,
    MOUNTED,
    MOUNTING,
    NOT_BOOTSTRAPPED,
    NOT_LOADED,
    NOT_MOUNTED,
    SKIP_BECAUSE_BROKEN,
    UNLOADING,
    UNMOUNTING,
    UPDATING,
} from 'single-spa';
import { isServiceInError } from './singleSpaHelpers';

jest.mock('single-spa', () => {
    return {
        ...jest.requireActual('single-spa'),
        getAppStatus: jest.fn(),
    };
});

const mockedGetAppStatus = getAppStatus as jest.Mock;

const errorStates = [LOAD_ERROR, SKIP_BECAUSE_BROKEN];
const nonErrorStates = [
    NOT_LOADED,
    LOADING_SOURCE_CODE,
    NOT_BOOTSTRAPPED,
    BOOTSTRAPPING,
    NOT_MOUNTED,
    MOUNTING,
    MOUNTED,
    UPDATING,
    UNMOUNTING,
    UNLOADING,
];

describe('singleSpaHelpers', () => {
    describe('isServiceInError', () => {
        test('should return true when status is LOAD_ERROR or SKIP_BECAUSE_BROKEN', () => {
            errorStates.forEach((errorStatus) => {
                mockedGetAppStatus.mockImplementationOnce(() => errorStatus);
                expect(isServiceInError('test-service')).toBe(true);
            });
        });

        test('should return false when status is not LOAD_ERROR or SKIP_BECAUSE_BROKEN', () => {
            nonErrorStates.forEach((nonErrorStatus) => {
                mockedGetAppStatus.mockImplementationOnce(() => nonErrorStatus);
                expect(isServiceInError('test-service')).toBe(false);
            });
        });
    });
});
