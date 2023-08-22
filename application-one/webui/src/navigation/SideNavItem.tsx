import { Routes } from './Routes';
import { NavLink } from 'react-router-dom';
import styles from './SideNavItem.module.css';
import {ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip} from '@mui/material';
import React from 'react';

export interface SideNavItemProps {
    titleText: string;
    route: Routes;
    isOpen: boolean;
    icon: JSX.Element;
}

export const SideNavItem = ({ titleText, route, isOpen, icon }: SideNavItemProps): JSX.Element => {
    return (
        <NavLink className={styles['nav-link-text']} key={titleText} to={route}>
            <Tooltip title={!isOpen ? titleText : ''} arrow placement={'right'}>
                <ListItemButton className={styles['list-item__button']}>
                    <ListItemIcon className={styles['list-item__icon']}>{icon}</ListItemIcon>
                    {isOpen && <ListItemText primary={titleText}/>}
                </ListItemButton>
            </Tooltip>
        </NavLink>
    );
};
