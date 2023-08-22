import React, {ComponentType, useMemo} from 'react';
import styles from './Dashboard.module.css';
import { getServices } from '../../utils/remoteComponentUtility';
import { ComponentImportFunctions } from '../../componentImports';
import { LazyComponent } from '../components/LazyComponent';
import { FullPageEmptyState } from '../components/emptyStates/FullPageEmptyState';
import { WidgetsOutlined } from '@mui/icons-material';
import { convertToKebabCase } from '../../utils/textUtils';
import { Grid } from "@mui/material";
import { ColumnConfiguration } from "../../constants/Service";

/**
 * API for lazy loaded components
 */
export interface LazyComponentConfiguration {
    /**
     * The name of the component to be loaded
     */
    name: string;
    /**
     * Function used to import the component
     */
    importFunction: () => Promise<{ default: ComponentType<any> }>;
}

/**
 * API for dashboard component
 */
export interface DashboardComponentConfiguration extends LazyComponentConfiguration {
    /**
     * The (Optional)  configuration used to layout the dashboard appropriately in the grid
     */
    columnConfiguration?: ColumnConfiguration;
}

/**
 * Iterate through services to find the application dashboard components for display
 */
const getDashboardComponents = () => {
    return getServices().reduce((components, service) => {
        service.dashboardComponentReferences?.filter(({name, importPath, columnConfiguration}) => {
            const importFn = ComponentImportFunctions[importPath];
            if (importFn) {
                components.push({ name, importFunction: importFn, columnConfiguration })
            } else {
                console.error(`Unknown dashboard component import path ${importPath}`);
            }
        });
        return components;
    }, [] as DashboardComponentConfiguration[]);
}

/**
 * Displays the dashboard component using remote cards from another app
 */
export const Dashboard = (): React.JSX.Element => {
    const dashboardComponents = useMemo(() => getDashboardComponents(), [])

    return (
        <>
            {dashboardComponents.length === 0 ? (
                <FullPageEmptyState
                    icon={<WidgetsOutlined />}
                    title={'No components found'}
                    message={'We were unable to find any dashboard components configured for the application.'}
                />
            ) : (
                <div className={styles['container']}>
                    <Grid id={'dashboard-container'} container columns={{ xs: 4, sm: 8, md: 12 }}>
                        {dashboardComponents.map(({name, importFunction}, index) => (
                            <Grid
                                id={convertToKebabCase(name) || `${index}`}
                                key={convertToKebabCase(name)}
                                item
                                xs={4} sm={4} md={4}
                                className={styles['grid-item']}
                                padding={2}
                            >
                                <LazyComponent
                                    key={convertToKebabCase(name)}
                                    name={name}
                                    importFunction={importFunction}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </div>
            )}
        </>
    );
};
