import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkActivityFunctions } from 'single-spa';
import { isServiceInError } from '../../utils/singleSpaHelpers';
import { Cached, ErrorOutline } from '@mui/icons-material';
import { FullPageEmptyState } from './emptyStates/FullPageEmptyState';
import { getService } from '../../utils/remoteComponentUtility';
import { Button } from "@mui/material";
import { SINGLE_SPA_ROUTING_EVENT } from "../../constants/SingleSpaConstants";
import styles from './ServiceFailureFallback.module.css';

/**
 * Component used to display a message when a service is unavailable and provides options for the user
 */
export const ServiceFailureFallback = (): React.JSX.Element => {
    const [serviceName, setServiceName] = useState<string | undefined>(undefined);
    const navigation = useNavigate();

    /**
     * Function used to check if remote service is in error
     */
    const onSingleSpaRoutingEvent = useCallback(() => {
        const servicesThatShouldBeActive = checkActivityFunctions(window.location);

        if (servicesThatShouldBeActive.length === 1 && isServiceInError(servicesThatShouldBeActive[0])) {
            const serviceInError = servicesThatShouldBeActive[0];
            setServiceName(getService(serviceInError)?.label ?? serviceInError);
        } else {
            setServiceName(undefined);
        }
    }, []);

    useEffect(() => {
        // Check for service error
        onSingleSpaRoutingEvent();

        // Listen for routing events
        window.addEventListener(SINGLE_SPA_ROUTING_EVENT, onSingleSpaRoutingEvent);

        // Remove listeners when component unmounts
        return () => window.removeEventListener(SINGLE_SPA_ROUTING_EVENT, onSingleSpaRoutingEvent);
    }, [onSingleSpaRoutingEvent]);

    /**
     * Function used to reload current route
     */
    const onReloadCallback = () => navigation(0);

    /**
     * Function used to go back from current route
     */
    const onBackCallback = () => navigation(-1);

    return (
        <>
            {serviceName && (
                <FullPageEmptyState
                    icon={<ErrorOutline className={styles['icon']}/>}
                    title={'Service load error'}
                    message={
                        <>
                            Sorry, the <span className={styles['service-name']}>{serviceName}</span> service can&apos;t
                            be reached right now.
                        </>
                    }
                    actions={
                        <>
                            <Button
                                onClick={onBackCallback}
                                className={styles['button']}
                                color={'success'}
                                variant={'outlined'}
                            >
                                Go back
                            </Button>
                            <Button
                                color={'success'}
                                variant={'outlined'}
                                onClick={onReloadCallback}
                                startIcon={<Cached />}
                                className={styles['button']}
                            >
                                Reload {serviceName} service
                            </Button>
                        </>
                    }
                />
            )}
        </>
    );
};

export default ServiceFailureFallback;
