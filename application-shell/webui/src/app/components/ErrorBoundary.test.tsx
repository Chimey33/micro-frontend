import React from 'react';
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';
import {clickButton} from "../../testUtils/reactTestingLibraryUtils";

interface ChildWithErrorProps {
    /**
     * An integer representation of the error we want to throw
     */
    error: number;
}

const ChildWithErrors = ({ error }: ChildWithErrorProps): React.ReactElement => {
    if (error === 1) {
        throw new Error('Error thrown from child');
    } else if (error === 2) {
        throw new Error();
    } else return <>Child rendered with no errors</>;
};

interface TestProps {
    error: number;
}

const TestComponent = ({ error }: TestProps): React.ReactElement => {
    return (
        <ErrorBoundary suspenseFallback={''} componentName={'Test component'} errorHeading={'A problem occured'}>
            <ChildWithErrors error={error} />
        </ErrorBoundary>
    );
};

beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {
        // noop
    });
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe('<ErrorBoundary />', () => {
    describe('Initialisation', () => {
        test('should render the error boundary with the correct structure when error thrown', () => {
            render(<TestComponent error={1}/>);
            expect(screen.getByText(/A problem occured/i)).toBeVisible();
            expect(screen.getByText(/test component could not be displayed./i)).toBeVisible();
            expect(screen.getByRole('button', {name: /show errors/i})).toBeVisible();

            clickButton(/show errors/i);

            expect(screen.getByText(/error thrown from child/i)).toBeVisible();
        });

        test('should render child when no error thrown', () => {
            render(<TestComponent error={3}/>);
            expect(screen.queryByText(/A problem occured/i)).not.toBeInTheDocument();
            expect(screen.queryByText(/test component could not be displayed./i)).not.toBeInTheDocument();
            expect(screen.queryByRole('button', {name: /show errors/i})).not.toBeInTheDocument();
            expect(screen.getByText(/child rendered with no errors/i)).toBeVisible();
        });
    })
});
