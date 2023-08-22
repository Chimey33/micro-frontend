import { convertToKebabCase } from './textUtils';

describe('textUtils', () => {
    describe('convertToKebabCase', () => {
        test('should return undefined when empty string provided', () => {
            expect(convertToKebabCase('')).toBe(undefined);
        });

        test('should return string in correct format when provided string is lower case', () => {
            expect(convertToKebabCase('snake case')).toBe('snake-case');
        });

        test('should return string in correct format when provided string is upper case', () => {
            expect(convertToKebabCase('SNAKE CASE')).toBe('snake-case');
        });
    });
});
