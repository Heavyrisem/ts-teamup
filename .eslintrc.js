module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended', 'plugin:import/recommended'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  ignorePatterns: ['dist', 'node_modules', '.eslintrc.js'],
  rules: {
    'prettier/prettier': ['error', { "endOfLine": "auto" }],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'unknown'],
        pathGroupsExcludedImportTypes: [],
        pathGroups: [
          {
            pattern: '@nestjs/**',
            group: 'external',
            position: 'after',
          },
          {
            pattern: '~*/**',
            group: 'internal',
            position: 'before',
          },
        ],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'always',
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'no-shadow': 'off',
    'lines-between-class-members': 'off',
    'no-await-in-loop': 'off',
    'import/prefer-default-export': 'off',
    'class-methods-use-this': 'off',
    "import/no-extraneous-dependencies": ["error", { "devDependencies": ["examples/**"] }]
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.entity'],
        moduleDirectory: ['node_modules', '@types'],
      },
      typescript: {}, // this loads <rootdir>/tsconfig.json to eslint
    },
  }
};
