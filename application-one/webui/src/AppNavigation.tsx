import React, { Suspense, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { RouteDefinitions } from './navigation/Routes';
import { SideNavMenu } from './navigation/SideNavMenu';
import { SideNavBar } from "./components/SideNavBar";
import { RouteDefinition } from "./types/RouteDefinition";
import { CircularProgress } from "@mui/material";
import styles from './AppNavigation.module.css';

export interface AppNavigationProps {
    mountType: 'embedded' | 'standalone'
}

export const AppNavigation = ({mountType}: AppNavigationProps): JSX.Element => {
    const [open, setOpen] = useState(false);

    return (
        <div className={styles['content']}>
            <Suspense fallback={<CircularProgress />}>
            <SideNavBar
                open={open}
                mountType={mountType}
                menuItems={<SideNavMenu isOpen={open} parentMenuItemClickedCallback={setOpen}/>}
                toggleMenuCallback={setOpen}
            >
                <div className={styles['content-wrapper']}>
                    <Routes>
                        {RouteDefinitions.map(({path, ...routeProps}: RouteDefinition) => (
                            <Route key={path} path={path} {...routeProps} />
                        ))}
                    </Routes>
                </div>
            </SideNavBar>
            </Suspense>
        </div>
    );
};

export default AppNavigation;
