import {Paper, Typography} from '@mui/material';
import React from 'react';
import styles from './ContentSection.module.css';

export interface ContentSectionProps {
    title?: string;
    children: React.ReactNode;
    variant?: 'elevation' | 'outlined';
}

export const ContentSection = ({ title, children, variant,}: ContentSectionProps): JSX.Element => {

    return (
        <Paper variant={variant} className={styles['container']}>
            {title &&
                <>
                    <div className={styles['title-with-details']}>
                        <Typography variant={'h4'} className={styles['content-section__typography']}>
                            {title}
                        </Typography>
                    </div>
                    <div className={styles['content']}>{children}</div>
                </>
            }
        </Paper>
    );
};

export default ContentSection;
