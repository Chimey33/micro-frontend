import { RouteProps } from 'react-router-dom';

export type RouteDefinition = {
    path: string;
    label?: string;
} & Omit<RouteProps, 'path' | 'lazy' | 'index'>
