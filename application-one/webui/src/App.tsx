import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import {StyledEngineProvider} from '@mui/material/styles';
import AppNavigation from "./AppNavigation";
import {BrowserRouter} from "react-router-dom";
import './styles/style.global.css'
import { APPLICATION_PREFIX } from "./constants/NamespacingConstants";

export interface AppProps {
    /**
     * The mount type of the application
     * If embedded styling is applied to ensure that page layout remains correct
     */
    mountType?: 'standalone' | 'embedded';
    /**
     * The basename of the application shell, this is used for routing
     */
    shellBasename?: string;
}

export const App = ({mountType = 'standalone', shellBasename}: AppProps): React.JSX.Element => {
    const basename = mountType === 'standalone' ? '' : `${shellBasename}/${APPLICATION_PREFIX}`;
    return (
        <StyledEngineProvider injectFirst>
            <div className={APPLICATION_PREFIX}>
                <BrowserRouter basename={basename}>
                    <AppNavigation mountType={mountType}/>
                </BrowserRouter>
            </div>
        </StyledEngineProvider>
    );
};

declare interface RootProps {
    basename: string;
}

export const RootComponent = ({basename}: RootProps): JSX.Element => (
    <App shellBasename={basename} mountType={'embedded'}/>
);

const headerLifecycles = singleSpaReact({
    React,
    ReactDOM,
    rootComponent: RootComponent,
});

export const bootstrap = headerLifecycles.bootstrap;
export const mount = headerLifecycles.mount;
export const unmount = headerLifecycles.unmount;

export default App;
