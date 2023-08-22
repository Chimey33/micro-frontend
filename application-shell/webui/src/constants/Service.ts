/**
 * The API definition of a remote component in the application
 */
export interface ComponentReference {
    /**
     * The name of the application
     */
    name: string;
    /**
     * The path used by module federation to mount the component
     */
    importPath: string;
}

/**
 * Configuration of the columns displayed on the dashboard
 */
export interface ColumnConfiguration {
    sm?: number;
    md?: number;
    lg?: number;
}

/**
 * The API definition of a remote component displayed on the dashboard of the application
 */
export interface DashboardComponentReference extends ComponentReference {
    columnConfiguration?: ColumnConfiguration
}

/**
 * API definition of a service mounted within the application
 */
export interface Service {
    /**
     * The name of the service
     */
    name: string;
    /**
     * The label of the service
     */
    label: string;
    /**
     * The client route used to mount the service
     */
    clientSideRoute: string;
    /**
     * The root component reference (landing page of the remote component)
     */
    rootComponentReference?: ComponentReference;
    /**
     * Remote components that will be displayed on the dashboard
     */
    dashboardComponentReferences?: DashboardComponentReference[];
    /**
     * Boolean that denotes if the service is enabled in the UI
     */
    enabled?: boolean;
}
