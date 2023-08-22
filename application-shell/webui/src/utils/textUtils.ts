/**
 * Converts a string to a kebab-case string.
 * @param value the string value to convert
 */
export const convertToKebabCase = (value?: string): string | undefined => {
    if (!value) return;
    return value.replace(/ /g, '-').toLowerCase();
};
