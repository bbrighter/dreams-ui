import pluginJs from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin'
import pluginReact from 'eslint-plugin-react';
import reactCompiler from 'eslint-plugin-react-compiler'
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';


export default [
    {
        files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    },
    {
        languageOptions:
            { globals: globals.browser },
    },
    {
        ignores: [
            'node_modules/',
            'dist/',
        ],
    },
    {
        plugins: {
            '@stylistic': stylistic,
            'simple-import-sort': simpleImportSort,
        },
    },
    pluginReact.configs.flat.recommended,
    pluginJs.configs.recommended,
    reactCompiler.configs.recommended,
    ...tseslint.configs.recommended,
    {
        rules: {
            'quotes': ['error', 'single'],
            'comma-dangle': ['error', 'always-multiline'],
            'object-curly-spacing': ['error', 'always'],
            'no-console': 'warn',
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
            'simple-import-sort/imports': 'error',
            'simple-import-sort/exports': 'error',
        },
    },
    {
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
];