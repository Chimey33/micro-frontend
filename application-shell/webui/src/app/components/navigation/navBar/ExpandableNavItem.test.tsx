import React from 'react';
import { Router } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { ExpandableNavItem } from './ExpandableNavItem';
import { createBrowserHistory, History, LocationState } from 'history';
import { MenuItemProps } from "../../../../constants/NavItemConstants";
import { clickButton, clickLink } from "../../../../testUtils/reactTestingLibraryUtils";

const menuWithSubMenuItems: MenuItemProps = {
    id: 'menu-with-sub-menu-items',
    label: 'Menu with sub men items',
    submenuItems: [
        {
            id: 'sub-menu-item-one',
            label: 'Item one',
            to: '/sub/item/one',
            externalService: false,
        },
        {
            id: 'sub-menu-item-two',
            label: 'Item two',
            to: '/sub/item/two',
            externalService: false,
        },
    ],
    externalService: false,
};

interface TestProps {
    history?: History<LocationState>
}
const TestComponent = ({history = createBrowserHistory()}: TestProps): JSX.Element => {
    return (
        <Router history={history}>
            <ExpandableNavItem {...menuWithSubMenuItems} />
        </Router>
    );
};

describe('<ExpandableNavItem>', () => {
    describe('Initialisation', () => {
        test('should display the top level nav icon', () => {
            render(<TestComponent/>);
            expect(screen.getByTestId('AppsIcon')).toBeVisible();

            //The embedded items shouldn't be shown initially
            expect(screen.queryByText('Item one')).not.toBeVisible();
            expect(screen.queryByText('Item two')).not.toBeVisible();
        });
    })

    describe('User actions', () => {
        test('should render menu items when icon is clicked', async () => {
            render(<TestComponent/>);
            expect(screen.queryByText('Item one')).not.toBeVisible();
            expect(screen.queryByText('Item two')).not.toBeVisible();

            await clickButton('Show services menu');

            expect(screen.getByText('Item one')).toBeVisible();
            expect(screen.getByText('Item two')).toBeVisible();
        });

        test('should change nav icon when clicked', async () => {
            render(<TestComponent/>);
            expect(screen.getByTestId('AppsIcon')).toBeVisible();
            expect(screen.queryByTestId('CloseIcon')).not.toBeInTheDocument();

            await clickButton('Show services menu');

            expect(screen.queryByTestId('AppsIcon')).not.toBeInTheDocument();
            expect(screen.getByTestId('CloseIcon')).toBeVisible();
        });

        test('should navigate to the correct path when clicking on an embedded item', async () => {
            const history = createBrowserHistory();
            render(<TestComponent history={history}/>);

            await clickButton('Show services menu');
            await clickLink('Item one');

            expect(history.location.pathname).toBe('/sub/item/one');
        });

        test('should navigate and close menu when menu item is clicked', async () => {
            render(<TestComponent/>);
            await clickButton('Show services menu');
            await clickLink('Item one');

            await waitFor(() => expect(screen.queryByText('Item two')).not.toBeVisible());
        });
    })
});
