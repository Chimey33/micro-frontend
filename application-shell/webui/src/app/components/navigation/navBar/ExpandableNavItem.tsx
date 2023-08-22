import React, { useState } from 'react';
import { Apps, Close } from '@mui/icons-material';
import { ServicesNavBar } from './expandableNavItem/ServicesNavBar';
import { IconButton } from '@mui/material';
import { MenuItemProps } from "../../../../constants/NavItemConstants";
import styles from './ExpandableNavItem.module.css';

/**
 * Renders a button that can toggle an expandable panel which contains sub menu items
 */
export const ExpandableNavItem = ({ id, submenuItems }: MenuItemProps): JSX.Element => {
    const [open, setOpen] = useState<boolean>(false);

    /**
     * Handles opn and close state of menu item
     * @param value the updated open or closed state
     */
    const handleClose = (value: boolean) => setOpen(value);

    return (
        <>
            <IconButton
                id={id}
                className={styles['expandable-nav_icon-button']}
                onClick={() => setOpen(!open)}
                aria-label={open ? 'Close services menu' : 'Show services menu'}
            >
                {open ? <Close /> : <Apps />}
            </IconButton>
            <ServicesNavBar open={open} menuItems={submenuItems} handleClose={handleClose}/>
        </>
    );
};
