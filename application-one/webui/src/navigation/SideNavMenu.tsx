import {List} from '@mui/material';
import {AppsOutageOutlined, DashboardOutlined, DeviceHub,} from '@mui/icons-material';
import React from 'react';
import {Routes} from './Routes';
import {SideNavItem} from './SideNavItem';

export interface SideNavMenuProps {
    isOpen: boolean;
    parentMenuItemClickedCallback: (open: boolean) => void;
}

export const SideNavMenu = ({ isOpen }: SideNavMenuProps): JSX.Element => {

    return (
        <List component={'div'}>
            <SideNavItem
                titleText={'Dashboard'}
                route={Routes.DASHBOARD}
                isOpen={isOpen}
                icon={<DashboardOutlined />}
            />
            <SideNavItem
                titleText={'Route one'}
                route={Routes.ROUTE_ONE}
                isOpen={isOpen}
                icon={<DeviceHub />}
            />
            <SideNavItem
                titleText={'Route two'}
                route={Routes.ROUTE_TWO}
                isOpen={isOpen}
                icon={<AppsOutageOutlined />}
            />
        </List>
    );
};
