import React, { ComponentType, lazy } from 'react';
import { Skeleton } from '@mui/material';
import { ErrorBoundary } from './ErrorBoundary';
import { BASENAME } from "../../constants/ContextPathConstants";

/**
 * Api definition for the {@link LazyComponent}
 */
export interface LazyComponentProps {
    /**
     * The name of the component to be loaded
     */
    name: string;
    /**
     * Function used to import the component
     */
    importFunction: () => Promise<{ default: ComponentType<any> }>;
}

/**
 * Lazy loads a component using its import function.
 * Includes error boundary as a fallback for when a component cannot be loaded
 */
export const LazyComponent = ({ name, importFunction }: LazyComponentProps): JSX.Element => {
    const Component = lazy(() => importFunction());

    return (
        <ErrorBoundary
            errorHeading={`An error occurred loading ${name}`}
            componentName={name}
            suspenseFallback={<Skeleton height={'180px'} variant={'rectangular'} />}
        >
            <Component basename={BASENAME} />
        </ErrorBoundary>
    );
};
