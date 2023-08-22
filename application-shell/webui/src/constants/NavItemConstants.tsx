import React from "react";

/**
 * Properties to be provided to a navigation menu
 * Cannot have submenu items or click handler, and must have a navigation 'to' element.
 */
export type NavigableMenuItemProps = Omit<MenuItemProps, 'submenuItems' | 'onClick'>;

/**
 * API definition of menu items in the application shell
 */
export interface MenuItemProps {
    /**
     * The unique identifier of the menu item
     */
    id: string;
    /**
     * The label displayed whne menu is expanded
     */
    label: string;
    /**
     * The (Optional) icon displayed in the menu
     */
    icon?: React.JSX.Element;
    /**
     * The path navigated to when the menu item is clicked
     */
    to?: string;
    /**
     * The (Optional) sub menu items.
     */
    submenuItems?: NavigableMenuItemProps[];
    /**
     * The (Optional) callback trigger when a menu item is clicked
     */
    onClick?: () => void;
    /**
     * The (Optional) class name applied to the menu item text
     */
    className?: string;
    /**
     * Boolean that denotes whether a service is an external service
     * This flag will cause this menu item to open in a new window
     */
    externalService: boolean;
}

