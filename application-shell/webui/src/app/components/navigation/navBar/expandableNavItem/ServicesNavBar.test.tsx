import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ServicesNavBar, ServicesNavBarProps } from "./ServicesNavBar";
import { clickLink } from "../../../../../testUtils/reactTestingLibraryUtils";


const handleCloseMock = jest.fn();

const TestComponent = (): React.ReactElement => {
    const props: ServicesNavBarProps = {
        open: true,
        handleClose: handleCloseMock,
        menuItems: [
            {
                id: 'sub-menu-item-one',
                label: 'Sub menu item one',
                to: '/sub/item/one',
                externalService: false,
            },
            {
                id: 'sub-menu-item-two',
                label: 'Sub menu item two',
                to: '/sub/item/two',
                externalService: false,
            },
            {
                id: 'external',
                label: 'External',
                to: '/external',
                externalService: true,
            },
        ],
    };
    return (
        <Router history={createBrowserHistory()}>
            <ServicesNavBar {...props} />;
        </Router>
    );
};

describe('<ServicesNavBar>', () => {
    describe('Initialisation', () => {
        test('should render the services nav bar with correct structure', () => {
            render(<TestComponent/>);

            expect(screen.getByText(/sub menu item one/i)).toBeVisible();
            expect(screen.getByText(/sub menu item two/i)).toBeVisible();

            expect(screen.getByText(/external/i)).toBeVisible();
            expect(screen.getByLabelText(/open external in new window/i)).toBeVisible();
        });


        test('should render external menu item with correct attributes', () => {
            render(<TestComponent/>);

            expect(screen.getByRole('link', {name: /open external in new window/i})).toHaveAttribute('href', '/external');
            expect(screen.getByRole('link', {name: /open external in new window/i})).toHaveAttribute('target', '_blank');
        });
    })

    describe('User actions', () => {
        test('should invoke close callback when menu item is clicked', async() => {
            render(<TestComponent/>);

            await clickLink(/open external in new window/i);

            await expect(handleCloseMock).toBeCalled();
        });
    })
});
