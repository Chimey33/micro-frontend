import React from 'react';
import styles from './PageContainer.module.css';
import { Helmet } from 'react-helmet';
import { Typography } from "@mui/material";

export interface PageContainerProps {
    title?: string;
    subtitle?: React.ReactNode;
    children?: React.ReactNode;
}

export const PageContainer = ({
    title,
    subtitle,
    children,
}: PageContainerProps): JSX.Element => {
    return (
        <div className={styles['container']}>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <main className={styles['container__content']}>
                {(title) && (
                    <div className={styles['container__content__headings']}>
                        <div className={styles['container__content__headings__title-actions-group']}>
                            <>{title && <Typography variant={'h3'} className={styles['container__content__typography']}>{title}</Typography>}</>
                        </div>
                        {subtitle && <Typography variant={'h5'} className={styles['container__content__typography']}>{subtitle}</Typography>}
                    </div>
                )}
                <>{children}</>
            </main>
        </div>
    );
};
