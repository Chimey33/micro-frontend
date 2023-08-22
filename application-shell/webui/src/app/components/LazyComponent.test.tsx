import { render, screen, waitFor } from '@testing-library/react';
import React, {ComponentType} from 'react';
import { LazyComponent } from './LazyComponent';

interface TestProps {
    importFunction: () => Promise<{ default: ComponentType<any> }>
}
const TestComponent = ({importFunction}: TestProps) => {
    return <LazyComponent name={'Test component'} importFunction={importFunction} />;
};

describe('LazyComponent', () => {
    describe('LazyComponent', () => {
        test('should lazy load a component using the import function', async () => {
            render(<TestComponent importFunction={() => import('../../testUtils/LazyLoadingTestComponent')}/>);

            await waitFor(() => expect(screen.getByText(/test component/i)).toBeVisible());
        });
    });
});
