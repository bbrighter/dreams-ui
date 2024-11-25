// import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import tseslint from "typescript-eslint";

export default [
    {
        files: ["**/*.{js,mjs,cjs,ts,jsx,tsx,ts}"],
    },
    //// Globals not working currently with strange error message
    // {
    //     languageOptions: {
    //         globals: globals.browser
    //     },
    // },
    {
        ignores: [
            "node_modules/",
            "dist/",
        ],
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    {
        rules: {
            "quotes": ["error", "double"],
            "indent": ["error", 4, { "SwitchCase": 1 }],
            "comma-dangle": ["error", "always-multiline"],
            "object-curly-spacing": ["error", "always"],
            "no-console": "warn",
            "@typescript-eslint/no-unused-vars": "warn",
            "react/react-in-jsx-scope": "off",
        },
    },
    {
        settings: {
            react: {
                version: "detect",
            },
        },
    },
];