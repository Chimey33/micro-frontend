import { registerApplication } from 'single-spa';
import { getService, getServices, registerService, Services } from './remoteComponentUtility';
import { Service } from "../constants/Service";
import { BASENAME } from "../constants/ContextPathConstants";

jest.mock('single-spa');
const registerApplicationMock = registerApplication as jest.Mock;

beforeEach(() => {
    Services.splice(0);
    registerApplicationMock.mockReset();
});

const service: Service = {
    name: 'appOne',
    label: 'App one',
    clientSideRoute: '/appOne',
    enabled: true,
    rootComponentReference: {
        name: 'AppOne',
        importPath: 'appOne/AppOne'
    },
};

describe('remoteServiceUtility', () => {
    describe('registerService', () => {
        test('should register application with service registration parameters', () => {
            registerService(service);

            expect(registerApplicationMock).toHaveBeenCalledWith(
                service.name,
                expect.any(Function),
                expect.any(Function),
                { basename: BASENAME }
            );
            expect(getServices()).toEqual([service]);
        });

        test('should not register the service and should display console error when the import path is not known', () => {
            jest.spyOn(console, 'error').mockImplementationOnce(() => {
                //noop
            });

            const unknownService = {
                ...service,
                rootComponentReference: {
                    name: 'test',
                    importPath: 'unknownImportPath',
                },
            }

            registerService(unknownService);

            expect(registerApplicationMock).not.toHaveBeenCalled();
            expect(console.error).toHaveBeenCalledWith('Unknown root component import path unknownImportPath');
            expect(getServices()).toEqual([]);
        });

        test('should register external service with service registration parameters', () => {
            const externalService: Service = {
                name: 'appTwo',
                label: 'App two',
                clientSideRoute: '/appTwo',
                enabled: true,
            };

            registerService(externalService);

            expect(registerApplicationMock).not.toHaveBeenCalled();
            expect(getServices()).toEqual([externalService]);
        });
    });

    describe('getService', () => {
        test('should get a service given a service name', () => {
            const serviceOne: Service = {
                name: 'service-one',
                label: 'Service One',
                clientSideRoute: '/service-one',
                enabled: true,
            };
            const serviceTwo: Service = {
                name: 'service-two',
                label: 'Service Two',
                clientSideRoute: '/service-two',
                enabled: true,
            };

            // Add the services
            Services.push(serviceOne);
            Services.push(serviceTwo);

            expect(getService(serviceOne.name)).toEqual(serviceOne);
            expect(getService(serviceTwo.name)).toEqual(serviceTwo);
            expect(getService('service that does not exist')).toBeUndefined();
        });
    });
});
