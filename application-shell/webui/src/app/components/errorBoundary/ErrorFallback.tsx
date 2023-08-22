import React, {useState} from 'react';
import {FallbackProps} from 'react-error-boundary';
import styles from './ErrorFallback.module.css';
import {ErrorOutlineOutlined} from '@mui/icons-material';
import {Button, Typography} from "@mui/material";

/**
 * Api definition of the {@link ErrorFallback} component.
 */
export interface ErrorFallbackProps extends FallbackProps {
    /**
     * The name of the component we are attempting to display
     */
    componentName: string;
    /**
     * The (Optional) error heading to display when an error occurs
     */
    errorHeading?: string;
}

/**
 * The fallback displayed when an unknown error occurs
 */
export const ErrorFallback = ({error, componentName, errorHeading}: ErrorFallbackProps): React.ReactElement => {
    const [showErrors, setShowErrors] = useState<boolean>(false);

    return (
        <div className={styles['error-fallback__container']}>
            {errorHeading && (
                <div className={styles['error-fallback__heading']}>
                    <ErrorOutlineOutlined className={styles['icon']}/>
                    <Typography variant={'h4'} classes={{root: styles['error-fallback__typography']}}>
                        {errorHeading}
                    </Typography>
                </div>
            )}
            <Typography variant={'body1'} classes={{root: styles['error-fallback__typography']}}>
                {componentName} could not be displayed.
            </Typography>
            <div className={styles['error-fallback__buttons-container']}>
                {error?.message && (
                    <Button
                        variant={'outlined'}
                        color={'success'}
                        onClick={() => setShowErrors((show) => !show)}
                        className={styles['error-fallback__button']}
                    >
                        {showErrors ? 'Hide errors' : 'Show errors'}
                    </Button>
                )}
            </div>
            {showErrors &&
                <Typography variant={'body2'} classes={{root: styles['error-fallback__typography']}}>
                    {error?.message}
                </Typography>
            }
        </div>
    );
};
