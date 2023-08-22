import { getServiceMenuItems } from './navBarUtil';
import { getServices } from "../../../utils/remoteComponentUtility";
import { Service } from "../../../constants/Service";
import { NavigableMenuItemProps } from "../../../constants/NavItemConstants";

jest.mock('../../../utils/remoteComponentUtility');
const getServicesMock = getServices as jest.Mock;

beforeEach(() => {
    getServicesMock.mockReturnValue([]);
});

describe('navBarUtil', () => {
    describe('getServiceMenuItems', () => {
        test('should return correct value when service is NOT an external service', () => {
            const service: Service = {
                name: 'Test',
                label: 'Test name',
                clientSideRoute: '/test',
                rootComponentReference: {
                    name: 'TestComponent',
                    importPath: 'test/test',
                },
            };

            const expectedMenuItem: NavigableMenuItemProps = {
                id: 'Test',
                label: 'Test name',
                to: service.clientSideRoute,
                externalService: false,
            };

            getServicesMock.mockReturnValue([service]);

            expect(getServiceMenuItems()).toEqual([expectedMenuItem]);
        });

        test('should return correct value when service is an external service', () => {
            const service: Service = { name: 'Test', label: 'Test name', clientSideRoute: '/test' };

            const expectedMenuItem: NavigableMenuItemProps = {
                id: 'Test',
                label: 'Test name',
                to: service.clientSideRoute,
                externalService: true,
            };

            getServicesMock.mockReturnValue([service]);

            expect(getServiceMenuItems()).toEqual([expectedMenuItem]);
        });
    });
});
