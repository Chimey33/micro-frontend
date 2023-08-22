import React from 'react';
import ReactDOM from 'react-dom/client';
import { start } from 'single-spa';
import App from './app/App';
import { registerService } from './utils/remoteComponentUtility';
import { Service } from "./constants/Service";

/**
 * These are hard coded for simplicity but may be retrieved from an external endpoint.
 */
const services: Service[] = [
    {
        name: 'appOne',
        label: 'App one',
        clientSideRoute: '/appOne',
        enabled: true,
        rootComponentReference: { name: 'AppOne', importPath: 'appOne/AppOne' },
        dashboardComponentReferences: [
            { name: 'CardOne', importPath: 'appOne/CardOne' },
            { name: 'CardTwo', importPath: 'appOne/CardTwo' },
            { name: 'CardThree', importPath: 'appOne/CardThree' }
        ],
    },
    { name: 'Facebook', label: 'Facebook', clientSideRoute: 'https://facebook.com', enabled: true }

]

/**
 * Setup application and register services
 */
const bootstrapApplication = async () => {
    // Fetch services here
    services.forEach(service => !!service?.enabled && registerService(service))
};

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

/**
 * Start the shell using single spa
 */
const startShell = () => {
    start({ urlRerouteOnly: true });
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    )
};

bootstrapApplication().finally(startShell);
