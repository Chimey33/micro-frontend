
export const ComponentImportFunctions: Record<string, () => Promise<any>> = {
    'appTwo/BureausTable': () => import('appTwo/BureausTable'),
};
