import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

/**
 * Find, assert, and click a button
 * @param buttonText the name of the button to click
 */
export const clickButton = async (buttonText: string | RegExp): Promise<void> => {
    const button = screen.getByRole('button', { name: buttonText });
    expect(button).toBeVisible();

    await userEvent.click(button);
};

/**
 * Find, assert, and click a link.
 * @param linkText the name of the link to click
 */
export const clickLink = async (linkText: string | RegExp): Promise<void> => {
    const link = screen.getByRole('link', { name: linkText });
    expect(link).toBeVisible();
    await userEvent.click(link);
};
