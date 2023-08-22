import React, { useMemo } from 'react';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import { NavLink } from 'react-router-dom';
import { Divider, Link, List, ListItem, ListItemText } from '@mui/material';
import { HomeOutlined, OpenInNew } from '@mui/icons-material';
import { NavigableMenuItemProps } from "../../../../../constants/NavItemConstants";
import styles from './ServiceNavBar.module.css';

/**
 * API definition of the {@link ServicesNavBar} component
 */
export interface ServicesNavBarProps extends DrawerProps {
    /**
     * The (Optional) menu items to render within the services navigation bar
     */
    menuItems?: NavigableMenuItemProps[];
    /**
     * Boolean that denotes the current state of the service bar
     */
    open: boolean;
    /**
     * Callback used to toggle menu closed
     * @param value the updated open/close state
     */
    handleClose: (value: boolean) => void;
}

/**
 * Displays the service menu bar with menu items
 */
export const ServicesNavBar = ({ menuItems, handleClose, open = false, ...rest }: ServicesNavBarProps): React.JSX.Element => {
    const serviceMenuItems = useMemo(() => menuItems, [menuItems])

    /**
     * Handle menu close
     */
    const closeMenu = () => handleClose(false);

    return (
            <Drawer
                PaperProps={{className: styles['service-nav_drawer-paper']}}
                variant={'persistent'}
                anchor={'right'}
                open={open}
                ModalProps={{ onBackdropClick: () => closeMenu() }}
                {...rest}
            >
                <List component={'div'}>
                    <ListItem>
                        <ListItemText className={styles['service-nav_subheader']}>
                            Services
                        </ListItemText>
                    </ListItem>
                    <Divider />
                    <Link
                        component={NavLink}
                        to={'/'}
                        key={'home-services-menu'}
                        className={styles['service-nav_nav-link']}
                        onKeyDown={closeMenu}
                        onClick={closeMenu}
                    >
                        <ListItem className={styles['service-nav_menu-item']}>
                            <ListItemText>Home</ListItemText>
                            <HomeOutlined fontSize={'small'} className={styles['service-nav_icon']}/>
                        </ListItem>
                    </Link>

                    {serviceMenuItems?.map(({label, to = '/', externalService}) =>
                        externalService ? (
                            <Link
                                href={to}
                                target={'_blank'}
                                className={styles['service-nav_nav-link']}
                                key={`${label}-services-menu`}
                                aria-label={`open ${label} in new window`}
                                onKeyDown={closeMenu}
                                onClick={closeMenu}
                            >
                                <ListItem className={styles['service-nav_menu-item']}>
                                    <ListItemText>{label}</ListItemText>
                                    <OpenInNew fontSize={'small'} className={styles['icon']}/>
                                </ListItem>
                            </Link>
                        ) : (
                            <Link
                                component={NavLink}
                                to={to}
                                key={`${label}-services-menu`}
                                className={styles['service-nav_nav-link']}
                                onKeyDown={closeMenu}
                                onClick={closeMenu}
                            >
                                <ListItem className={styles['service-nav_menu-item']}>
                                    <ListItemText>{label}</ListItemText>
                                </ListItem>
                            </Link>
                        )
                    )}
                </List>
            </Drawer>
    );
};
