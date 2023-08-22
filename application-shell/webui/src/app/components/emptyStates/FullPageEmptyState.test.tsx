import { render, screen } from '@testing-library/react';
import React from 'react';
import { FullPageEmptyState } from './FullPageEmptyState';

interface TestProps {
    icon?: React.ReactNode;
    actions?: React.ReactNode;
}
const TestComponent = ({icon, actions}: TestProps) => {
    return <FullPageEmptyState title={'Test title'} message={'Test message'} actions={actions} icon={icon}/>
};

describe('FullPageEmptyState', () => {
    describe('Initialisation', () => {
        test('should render all elements when provided', () => {
            render(<TestComponent icon={'Test icon'} actions={'Test actions'}/>);

            expect(screen.getByText(/test icon/i)).toBeVisible();
            expect(screen.getByRole('heading', {name: /test title/i})).toBeVisible();
            expect(screen.getByRole('heading', {name: /test message/i})).toBeVisible();
            expect(screen.getByText(/test actions/i)).toBeVisible();
        });

        test('should not render icon or actions when they are not provided', () => {
            render(<TestComponent/>);

            expect(screen.queryByText(/test icon/i)).not.toBeInTheDocument();
            expect(screen.queryByText(/test actions/i)).not.toBeInTheDocument();
        });
    })
});
