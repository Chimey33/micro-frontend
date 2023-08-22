import React, { lazy } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { RouteDefinition } from "../types/RouteDefinition";


export enum Routes {
    DASHBOARD = '/',
    ROUTE_ONE = '/route-one',
    ROUTE_TWO = '/route-two',
}

const Dashboard = lazy(() => import('../pages/Dashboard'));
const ComponentOne = lazy(() => import('../pages/ComponentOne'));
const ComponentTwo = lazy(() => import('../pages/ComponentTwo'));

export const RouteDefinitions: RouteDefinition[] = [
    {
        path: Routes.DASHBOARD,
        label: 'Dashboard',
        Component: Dashboard,
    },
    {
        path: Routes.ROUTE_ONE,
        label: 'Route one',
        Component: ComponentOne,
    },
    {
        path: Routes.ROUTE_TWO,
        label: 'Route two',
        Component: ComponentTwo,
    },
    {
        path: '*',
        Component: () => <Route path={'*'} element={<Navigate to={Routes.DASHBOARD}/>} />,
    },
];

