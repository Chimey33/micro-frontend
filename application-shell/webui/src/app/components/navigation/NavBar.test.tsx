import React from 'react';
import { NavBar } from './NavBar';
import { render, screen } from '@testing-library/react';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import { getServiceMenuItems } from './navBarUtil';

jest.mock('./navBarUtil');
const mockedGetServiceMenuItems = getServiceMenuItems as jest.Mock;

const TestComponent = (): React.ReactElement => {
    return (
        <Router history={createBrowserHistory()}>
            <NavBar />
        </Router>
    );
};

beforeEach(() => {
    mockedGetServiceMenuItems.mockImplementation(() => []);
});

describe('<Navbar>', () => {
    describe('Initialisation', () => {
        test('should render nav bar correctly when services ARE registered', () => {
            mockedGetServiceMenuItems.mockImplementationOnce(() => {
                return [{ label: 'App 1', id: 'A1', to: '/a1' }, { label: 'App 2', id: 'A2', to: '/a2' } ];
            });
            render(<TestComponent/>);

            expect(screen.getByText('Wrapper')).toBeVisible();
            expect(screen.getByLabelText('home')).toBeVisible();
            expect(screen.getByText('Services')).toBeInTheDocument();
        });

        test('should render nav bar correctly when there are NO services registered', () => {
            render(<TestComponent/>);
            expect(screen.getByLabelText('home')).toBeVisible();
            expect(screen.queryByText('Services')).not.toBeInTheDocument();
        });
    });
});
