import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

const prettierRules = {
	trailingComma: 'all',
	arrowParens: 'avoid',
	bracketSpacing: true,
	singleQuote: true,
	printWidth: 121,
	useTabs: false,
	tabWidth: 2,
	semi: true
};

const plugins = [
  'babel',
  'angular',
  'security',
  'react',
  'jest',
  'import',
  'jsx-a11y',
  'monorepo',
  'prettier',
  'no-mixed-operators',
  'react-hooks',
  'jest-dom',
  'testing-library',
];

const sharedRules = {
  'prettier/prettier': ['error', prettierRules],
  curly: 0,
  'no-var': 2,
  'one-var': 0,
  'no-console': 1,
  'babel/semi': 0,
  'prefer-const': 2,
  'react/prop-types': 0,
  'operator-linebreak': 0,
  'no-mixed-operators': 0,
  'babel/no-invalid-this': 0,
  'jsx-a11y/label-has-for': 0,
  'require-atomic-updates': 'warn',
  'jsx-a11y/no-autofocus': 'off',
  'jsx-a11y/iframe-has-title': 'off',
  'react-hooks/rules-of-hooks': 'error',
  'react-hooks/exhaustive-deps': 'off',
  'class-methods-use-this': 0,
  'newline-per-chained-call': 0,
  // 'arrow-body-style': ['error', 'as-needed'],
  'no-unused-vars': ['error', { ignoreRestSiblings: true }],
  'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
  'no-duplicate-imports': 2,
};


export default {
  extends: [
    'plugin:import/errors',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'plugin:security/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      impliedStrict: true,
    },
  },
  overrides: [
    overridesJs,
    overridesTs,
    {
      // .test.tsx / .test.ts / .test.jsx / .test.js
      files: ['**.test.[jt]s?(x)'],
      extends: [
        'plugin:jest/recommended',
        'plugin:jest/style',
        'plugin:jest-dom/recommended',
        'plugin:testing-library/react',
      ],
      rules: {
        'jest/no-done-callback': 'warn',
        'jest/require-top-level-describe': 'error',
        'jest/valid-describe-callback': 'error',
        'jest/valid-expect': 'error',
        'jest/prefer-called-with': 'warn',
        'jest/no-interpolation-in-snapshots': 'error',
        'jest/no-deprecated-functions': 'error',
        'jest/prefer-hooks-on-top': 'error',
        'jest/prefer-lowercase-title': ['error', { ignore: ['describe'] }],
        'testing-library/await-async-query': 'off',
        'testing-library/await-async-utils': 'off',
        'testing-library/no-render-in-setup': 'off',
        'testing-library/prefer-wait-for': 'error',
        'testing-library/no-unnecessary-act': 'off',
        'testing-library/no-node-access': 'off',
        'testing-library/prefer-screen-queries': 'off',
        'testing-library/prefer-presence-queries': 'off',
        'testing-library/no-container': 'off',
        'testing-library/render-result-naming-convention': 'off',
        'testing-library/prefer-query-by-disappearance': 'off',
        'testing-library/no-await-sync-query': 'off',
        'testing-library/no-wait-for-multiple-assertions': 'off',
        'testing-library/no-debugging-utils': 'off',
        'jest/consistent-test-it': ['error', { fn: 'test' }],
        'jest/no-conditional-expect': 'error',
        'jest/no-if': 'error',
        'jest/no-test-return-statement': 'error',
        'jest/prefer-spy-on': 'error',
      },
    },
  ],
  env: {
    es6: true,
    node: true,
    jest: true,
    jquery: true,
    browser: true,
  },
};
