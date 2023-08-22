import React, {useMemo} from 'react';
import {AppBar, Link, Toolbar, Typography} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { ExpandableNavItem } from './navBar/ExpandableNavItem';
import { getServiceMenuItems } from './navBarUtil';
import { MenuItemProps, NavigableMenuItemProps } from "../../../constants/NavItemConstants";
const logo = require('../../../assets/logo_small.png');
import styles from './NavBar.module.css';

/**
 * Callback used to sort menu items
 * @param item1 the first item for comparison
 * @param item2 the second item for comparison
 */
export const sortMenuItems = (item1: NavigableMenuItemProps, item2: NavigableMenuItemProps) => item1.label.localeCompare(item2.label)

/**
 * Retrieves the service menu items and then sorts them alphabetically
 */
const getSubMenuItems = () => {
    const serviceSubmenuItems = getServiceMenuItems();
    if (serviceSubmenuItems.length > 0) serviceSubmenuItems.sort(sortMenuItems);
    return serviceSubmenuItems
}

/**
 * The top navigation bar component that provides top level navigation to micro frontend services.
 */
export const NavBar = (): React.JSX.Element => {
    const submenuItems = useMemo(() => getSubMenuItems(), [])
    const servicesMenuItem: MenuItemProps = {
        id: 'services-menu-item',
        label: 'Services',
        submenuItems,
        externalService: false,
    };

    return (
        <>
            <AppBar id={'navBar'} className={styles['nav-bar']} position={'fixed'}>
                <Toolbar className={styles['nav-bar__toolbar']}>
                        <div className={styles['nav-bar__home--container']}>
                        <Link
                            id={'homeNavItem'}
                            component={RouterLink}
                            className={styles['nav-bar__logo']}
                            to={'/'}
                            aria-label={'home'}
                        >
                            <img src={logo} alt={'Home'} />
                        </Link>
                            <Typography>Wrapper</Typography>
                        </div>
                    <div className={styles['nav-items']}>
                        <div className={styles['nav-bar__services']}>
                            {submenuItems.length > 0 && <ExpandableNavItem {...servicesMenuItem} />}
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
            <Toolbar />
        </>
    );
};
