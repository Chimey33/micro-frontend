import { NavigableMenuItemProps } from "../../../constants/NavItemConstants";
import { getServices } from "../../../utils/remoteComponentUtility";

/**
 * Retrieves available service menu and maps them to an array of {@link NavigableMenuItemProps} for use
 */
export const getServiceMenuItems = (): NavigableMenuItemProps[] => {
    return getServices().map(({ name: id, label, clientSideRoute: to, rootComponentReference }) => {
        return { id, label, to, externalService: !rootComponentReference };
    });
};
