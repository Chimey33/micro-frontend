import React, { useEffect, useState } from 'react';
import { DrawerProps } from '@mui/material/Drawer';
import Drawer from '@mui/material/Drawer';
import styles from './SideNavBar.module.css';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import { KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight } from '@mui/icons-material';

export interface LogoProps {
    defaultURL: string;
    smallURL?: string;
    linkURL?: string;
}

export interface SideNavBarProps extends DrawerProps {
    children?: React.ReactNode;
    menuItems?: React.ReactNode;
    mountType?: 'standalone' | 'embedded';
    toggleMenuCallback?(isOpen: boolean): void;
    logo?: LogoProps;
}

export const SideNavBar = (props: SideNavBarProps): JSX.Element => {
    const {
        children,
        className,
        menuItems,
        mountType = 'standalone',
        open = false,
        toggleMenuCallback,
        logo,
        ...rest
    } = props;
    const [isOpen, setIsOpen] = useState(open);

    useEffect(() => {
        setIsOpen(open);
    }, [open]);

    return (
        <div className={`${className || ''}`}>
            <Drawer
                PaperProps={{
                    className: isOpen ? styles['drawer-paper-open'] : styles['drawer-paper-closed'],
                }}
                variant="persistent"
                open={true}
                {...rest}
            >
                <div className={styles['nav-container']}>
                    <div className={styles['nav-container__menu-items']}>
                        <nav>
                            {mountType === 'embedded' && <Toolbar />}
                            {menuItems}
                        </nav>
                    </div>
                    <List disablePadding>
                        <ListItem disablePadding className={styles['list-item']}>
                            <ListItemButton
                                aria-label={isOpen ? 'Collapse side navigation' : 'Expand side navigation'}
                                onClick={() => {
                                    setIsOpen(!isOpen);
                                    toggleMenuCallback && toggleMenuCallback(!isOpen);
                                }}
                                className={styles['list-item__button']}
                            >
                                <ListItemIcon className={styles['list-item__icon']}>
                                    {isOpen ? <KeyboardDoubleArrowLeft /> : <KeyboardDoubleArrowRight />}
                                </ListItemIcon>
                                {isOpen ? <ListItemText primary={'Collapse'} /> : null}
                            </ListItemButton>
                        </ListItem>
                    </List>
                </div>
            </Drawer>
            {children && <div className={styles[isOpen ? 'content-expanded' : 'content-contracted']}>{children}</div>}
        </div>
    );
};
