import { registerApplication } from 'single-spa';
import { ComponentImportFunctions } from '../componentImports';
import { Service } from "../constants/Service";
import { BASENAME } from "../constants/ContextPathConstants";

/**
 * The list of registered services
 */
export const Services: Service[] = [];

/**
 * Activity function passed to single spa register application function
 * @param clientSideRoute the route used to mount the service
 */
const activityFn = (clientSideRoute: string) => ({pathname}: Location): boolean => {
    return pathname.startsWith(`${BASENAME}${clientSideRoute}`);
}

/**
 * Registers a remote service using single-spa
 * @param name the name of the service
 * @param label the label displayed as part of the service menu
 * @param clientSideRoute the route used to mount the service
 * @param rootComponentReference the root component reference (landing page of the remote component)
 * @param dashboardComponentReferences remote components that will be displayed on the dashboard
 * @param enabled boolean that denotes if the service is enabled in the UI
 */
export const registerService = ({
    name,
    label,
    clientSideRoute,
    rootComponentReference,
    dashboardComponentReferences,
    enabled,
}: Service): void => {
    if (rootComponentReference) {
        const importFunction = ComponentImportFunctions[rootComponentReference.importPath];

        if (importFunction) {
            registerApplication(name, importFunction, activityFn(clientSideRoute),{ basename: BASENAME });
            Services.push({ name, label, clientSideRoute, rootComponentReference, dashboardComponentReferences, enabled});
        } else {
            console.error(`Unknown root component import path ${rootComponentReference.importPath}`);
        }
    } else {
        Services.push({ name, label, clientSideRoute, rootComponentReference, dashboardComponentReferences, enabled });
    }
};

/**
 * Returns the list of application services
 */
export const getServices = (): Service[] => {
    return [...Services];
};

/**
 * Returns a single service using its name
 * @param serviceName the name of the service to search for
 */
export const getService = (serviceName: string): Service | undefined => {
    return Services.find(({name}) => name === serviceName);
};
