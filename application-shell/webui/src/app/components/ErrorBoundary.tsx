import React, { Suspense } from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from './errorBoundary/ErrorFallback';

/**
 * API definition of the {@link ErrorBoundary} component
 */
export interface ErrorBoundaryProps {
    /**
     * The fallback to display when an error occurs
     */
    suspenseFallback: React.ReactNode;
    /**
     * The children to display when no errors occur
     */
    children?: React.ReactNode;
    /**
     * The name of the component
     */
    componentName: string;
    /**
     * The heading to display as part of the {@link ErrorFallback}
     */
    errorHeading?: string;
}

/**
 * Component that catches errors anywhere in the child component tree.
 * Displays the children if no errors, else the {@link ErrorFallback} component
 */
export const ErrorBoundary = ({
    componentName,
    errorHeading,
    suspenseFallback = <>Loading component...</>,
    children,
}: ErrorBoundaryProps): React.JSX.Element => {
    return (
        <ReactErrorBoundary
            FallbackComponent={(errorProps) => (
                <ErrorFallback componentName={componentName} errorHeading={errorHeading} {...errorProps} />
            )}
        >
            <Suspense fallback={suspenseFallback}>{children}</Suspense>
        </ReactErrorBoundary>
    );
};
