import React from 'react';
import { render, screen } from '@testing-library/react';
import { ErrorFallback } from './ErrorFallback';
import {clickButton} from "../../../testUtils/reactTestingLibraryUtils";

interface TestProps {
    errorHeading?: string;
    error?: Error;
}

const resetErrorBoundaryMock = jest.fn();

const TestComponent = ({ error = generateError(1), errorHeading }: TestProps): React.ReactElement => {
    return (
        <ErrorFallback
            error={error}
            componentName={'Test component'}
            errorHeading={errorHeading}
            resetErrorBoundary={resetErrorBoundaryMock}
        />
    );
};

const generateError = (errorState: number): Error => {
    switch (errorState) {
        case 1:
            return new Error('Error thrown from child');
        case 2:
        default:
            return new Error();
    }
};

beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {
        // noop
    });
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe('<ErrorFallback />', () => {
    describe('Initialising', () => {
        test('should render the error boundary with the correct structure when error thrown', () => {
            render(<TestComponent errorHeading={'A problem occurred'}/>);

            expect(screen.getByText(/A problem occurred/i)).toBeVisible();
            expect(screen.getByText(/test component could not be displayed./i)).toBeVisible();
            expect(screen.getByRole('button', {name: /show errors/i})).toBeVisible();
        });

        test('should render the error boundary with the correct structure when error thrown and no message available', () => {
            render(<TestComponent error={generateError(2)} errorHeading={'A problem occurred'}/>);

            expect(screen.getByText(/A problem occurred/i)).toBeVisible();
            expect(screen.getByText(/test component could not be displayed./i)).toBeVisible();
            expect(screen.queryByRole('button', {name: /show errors/i})).not.toBeInTheDocument();
            expect(screen.queryByRole('button', {name: /hide errors/i})).not.toBeInTheDocument();
        });
    });

    describe('User actions', () => {
        test('should render correct error message when errors are available', async () => {
            render(<TestComponent errorHeading={'A problem occurred'}/>);
            expect(screen.getByRole('button', {name: /show errors/i})).toBeVisible();
            expect(screen.queryByText(/error thrown from child./i)).not.toBeInTheDocument();

            await clickButton(/show errors/i);

            expect(screen.getByText(/error thrown from child/i)).toBeVisible();
            expect(screen.getByRole('button', {name: /hide errors/i})).toBeVisible();
            expect(screen.queryByRole('button', {name: /show errors/i})).not.toBeInTheDocument();
        });
    });
});
