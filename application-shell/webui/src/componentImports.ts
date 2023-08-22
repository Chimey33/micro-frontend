/**
 * Contains the list of all known import functions for remote components.
 * We define these statically so we can use them with webpack
 */
export const ComponentImportFunctions: Record<string, () => Promise<any>> = {
    'appOne/AppOne': () => import('appOne/AppOne'),
    'appOne/CardOne': () => import('appOne/CardOne'),
    'appOne/CardTwo': () => import('appOne/CardTwo'),
    'appOne/CardThree': () => import('appOne/CardThree'),

};
