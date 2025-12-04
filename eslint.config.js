import unusedImports from 'eslint-plugin-unused-imports';
import tseslint from 'typescript-eslint';

export default tseslint.config({
  ignores: ['*.js', '*.cjs', '*.mjs', '*.d.ts', '*.d.mts', 'vite.config.ts'],
  languageOptions: {
    parserOptions: {
      project: './tsconfig.json',
    },
  },
  plugins: {
    'unused-imports': unusedImports,
  },
  rules: {
    'import/extensions': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/no-unescaped-entities': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
  },
});
