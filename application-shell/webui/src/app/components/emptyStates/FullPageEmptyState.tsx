import React from 'react';
import styles from './FullPageEmptyState.module.css';
import { Typography } from "@mui/material";

/**
 * API definition for the {@link FullPageEmptyState} component
 */
export interface FullPageEmptyStateProps {
    /**
     * A short succinct message indicating the reason for the empty state
     */
    title: string;
    /**
     * Further details to display in conjunction with the title
     */
    message: React.ReactNode;
    /**
     * The (Optional) icon to display
     */
    icon?: React.ReactNode;
    /**
     * The (Optional) actions to display
     */
    actions?: React.ReactNode;
}

/**
 * Full page empty state displayed
 */
export const FullPageEmptyState = ({ icon, title, message, actions }: FullPageEmptyStateProps): JSX.Element => {
    return (
        <main className={styles['empty-state_container']}>
            {icon && <>{icon}</>}
            <div className={styles['empty-state_title-container']}>
                <Typography variant={'h2'} className={styles['empty-state_title']}>
                    {title}
                </Typography>
            </div>
            <div className={styles['empty-state_sub-title-container']}>
                <Typography variant={'h4'}>{message}</Typography>
            </div>
            {actions && <div className={styles['empty-state_actions']}>{actions}</div>}
        </main>
    );
};
