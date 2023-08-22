import { getAppStatus, LOAD_ERROR, SKIP_BECAUSE_BROKEN } from 'single-spa';

/**
 * Finds the service using single-spa api and returns true if in error
 * @param serviceName the name of the service to find
 */
export const isServiceInError = (serviceName: string): boolean => {
    const serviceStatus = getAppStatus(serviceName);
    return serviceStatus === LOAD_ERROR || serviceStatus === SKIP_BECAUSE_BROKEN;
};
