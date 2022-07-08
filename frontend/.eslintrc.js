export const eslintrc = [
    "airbnb",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:prettier/recommended",
];
export const parser = "@typescript-eslint/parser";
export const ignorePatterns = [".eslintrc.js"];
export const parserOptions = {
    ecmaFeatures: {
        jsx: true,
    },
    ecmaVersion: 2021,
    tsconfigRootDir: __dirname,
    sourceType: "module",
    project: "./tsconfig.json",
};
export const rules = {
    "import/no-unresolved": 0,
    "react/jsx-filename-extension": [
        1,
        {
            extensions: [".ts", ".tsx"],
        },
    ],
    "react/function-component-definition": [
        2,
        {
            namedComponents: "arrow-function",
        },
    ],
    "prettier/prettier": [
        "error",
        {
            singleQuote: false,
            trailingComma: "all",
            arrowParens: "avoid",
            endOfLine: "auto",
            semi: true,
            tabWidth: 4,
        },
    ],
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error"],
    "import/extensions": ["error", "never"],
    "react/prop-types": 0,
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],
};
export const plugins = ["@typescript-eslint", "react", "prettier"];
