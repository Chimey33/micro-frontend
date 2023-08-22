import React from 'react';
import App from './App';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { BASENAME } from "../constants/ContextPathConstants";
const TestComponent = (): React.JSX.Element => {
    return (
        <BrowserRouter basename={BASENAME} >
            <App />
        </BrowserRouter>
    );
};

describe('<App />', () => {
    describe('Initialisation', () => {
        test('should render app landing page with correct structure', () => {
            render(<TestComponent/>);

            expect(screen.getByRole('img', { name: /home/i })).toBeVisible();
            expect(screen.getByRole('banner')).toBeVisible();
            expect(screen.getByText(/wrapper/i)).toBeVisible();

            // We haven't configured any items so we should get the correct fallback
            expect(screen.getByRole('heading', {
                name: /we were unable to find any dashboard components configured for the application\./i
            })).toBeVisible();
            expect(screen.getByRole('heading', { name: /no components found/i })).toBeVisible()
        });
    });
});
