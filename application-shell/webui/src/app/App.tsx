import React from 'react';
import { StyledEngineProvider } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NavBar } from './components/navigation/NavBar';
import ServiceFailureFallback from './components/ServiceFailureFallback';
import { Dashboard } from './pages/Dashboard';
import { APPLICATION_PREFIX } from "../constants/NamespacingConstants";
import { BASENAME } from "../constants/ContextPathConstants";
import styles from './App.module.css';
import '../styles/style.global.css'

if (!window.location.pathname.includes(BASENAME)) {
    window.history.replaceState(
        '',
        '',
        BASENAME + window.location.pathname
    );
}

export const App = (): React.JSX.Element => {
    return (
        <StyledEngineProvider injectFirst>
            <div className={`${APPLICATION_PREFIX} ${styles['application-container']}`}>
                <BrowserRouter basename={BASENAME}>
                        <>
                            <NavBar />
                            <ServiceFailureFallback />
                            <Routes>
                                <Route path={'/'} element={<Dashboard />}/>
                            </Routes>
                        </>
                </BrowserRouter>
            </div>
        </StyledEngineProvider>
    );
};

export default App;
