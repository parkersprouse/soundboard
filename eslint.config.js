import js from '@eslint/js';
import globals from 'globals';
import pluginVue from 'eslint-plugin-vue';
import pluginQuasar from '@quasar/app-vite/eslint';
import stylistic from '@stylistic/eslint-plugin';
import vueTsEslintConfig from '@vue/eslint-config-typescript';

const ts_eslint_rules = {
  '@typescript-eslint/no-unused-vars': [
    'error',
    {
      args: 'all',
      argsIgnorePattern: '^_',
      caughtErrors: 'all',
      caughtErrorsIgnorePattern: '^_',
      destructuredArrayIgnorePattern: '^_',
      varsIgnorePattern: '^_',
      ignoreRestSiblings: true,
    },
  ],
};

/**
 * ------------------------------------------------------------------------------
 * ESLint Stylistic rule customization
 * https://eslint.style/rules
 */
const stylistic_rules = {
  '@stylistic/array-bracket-spacing': [
    'error',
    'never',
  ],
  '@stylistic/arrow-parens': [
    'error',
    'always',
  ],
  '@stylistic/brace-style': [
    'error',
    '1tbs',
    {
      allowSingleLine: true,
    },
  ],
  '@stylistic/comma-dangle': [
    'error',
    {
      arrays: 'always-multiline',
      enums: 'always-multiline',
      exports: 'always-multiline',
      functions: 'always-multiline',
      generics: 'always-multiline',
      imports: 'always-multiline',
      objects: 'always-multiline',
      tuples: 'always-multiline',
    },
  ],
  '@stylistic/comma-spacing': [
    'error',
    {
      after: true,
      before: false,
    },
  ],
  '@stylistic/comma-style': [
    'error',
    'last',
  ],
  '@stylistic/eol-last': [
    'error',
    'always',
  ],
  '@stylistic/function-paren-newline': [
    'error',
    'multiline-arguments',
  ],
  '@stylistic/indent': [
    'error',
    2,
  ],
  '@stylistic/key-spacing': [
    'error',
    {
      afterColon: true,
      beforeColon: false,
      mode: 'strict',
    },
  ],
  '@stylistic/max-len': [
    'error',
    {
      code: 120,
      ignoreComments: false,
      ignorePattern: '<path|d=', // ignore SVG data
      ignoreRegExpLiterals: true,
      ignoreStrings: false,
      ignoreTemplateLiterals: false,
      ignoreUrls: true,
    },
  ],
  '@stylistic/member-delimiter-style': [
    'error',
    {
      multiline: {
        delimiter: 'semi',
        requireLast: true,
      },
      singleline: {
        delimiter: 'semi',
        requireLast: true,
      },
      multilineDetection: 'brackets',
    },
  ],
  '@stylistic/no-multiple-empty-lines': [
    'error',
    {
      max: 2,
      maxBOF: 0,
      maxEOF: 1,
    },
  ],
  '@stylistic/no-tabs': 'error',
  '@stylistic/no-trailing-spaces': 'error',
  '@stylistic/no-whitespace-before-property': 'error',
  '@stylistic/object-curly-newline': [
    'error',
    {
      consistent: true,
      multiline: true,
    },
  ],
  '@stylistic/object-curly-spacing': [
    'error',
    'always',
    {
      arraysInObjects: true,
      objectsInObjects: true,
    },
  ],
  '@stylistic/object-property-newline': [
    'error',
    {
      allowAllPropertiesOnSameLine: true,
    },
  ],
  '@stylistic/operator-linebreak': [
    'error',
    'before',
  ],
  '@stylistic/quote-props': [
    'error',
    'as-needed',
  ],
  '@stylistic/quotes': [
    'error',
    'single',
    {
      allowTemplateLiterals: 'always',
      avoidEscape: true,
    },
  ],
  '@stylistic/semi': [
    'error',
    'always',
  ],
  '@stylistic/semi-spacing': [
    'error',
    {
      after: true,
      before: false,
    },
  ],
  '@stylistic/semi-style': [
    'error',
    'last',
  ],
  '@stylistic/space-before-function-paren': [
    'error',
    {
      anonymous: 'always',
      asyncArrow: 'always',
      named: 'never',
    },
  ],
  '@stylistic/spaced-comment': [
    'error',
    'always',
    {
      block: {
        markers: [
          '/',
          '*',
          '--',
        ],
      },
    },
  ],
};

/**
 * ------------------------------------------------------------------------------
 * Vue.js rule customization
 * https://eslint.vuejs.org/rules/
 */
const vue_rules = {
  'vue/block-order': ['error', {
    order: ['template', 'script', 'style'],
  }],
  'vue/comment-directive': ['error', {
    reportUnusedDisableDirectives: true,
  }],
  'vue/html-quotes': [
    'error',
    'single',
    {
      avoidEscape: true,
    },
  ],
  'vue/html-self-closing': [
    'error',
    {
      html: {
        component: 'always',
        normal: 'always',
        void: 'never',
      },
      math: 'always',
      svg: 'always',
    },
  ],
  'vue/prop-name-casing': 'off',
  'vue/require-default-prop': 'error',
  'vue/v-on-event-hyphenation': ['error', 'never'],
};

export default [
  {
    ignores: [
      'bin/**/*',
      'TEMPLATE.vue',
    ],
  },

  ...pluginQuasar.configs.recommended(),
  js.configs.recommended,

  /**
   * ------------------------------------------------------------------------------
   * [Extension] ESLint Stylistic's set of rules (recommended config)
   * https://eslint.style/guide/config-presets#static-configurations
   */
  stylistic.configs['recommended'],

  /**
   * https://eslint.vuejs.org
   *
  */
  ...pluginVue.configs['flat/recommended'],

  // https://github.com/vuejs/eslint-config-typescript
  ...vueTsEslintConfig({
    // https://typescript-eslint.io/users/configs#recommended-configurations
    extends: [
      'recommended',
      'stylistic',
    ],
  }),

  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',

      globals: {
        ...globals.browser,
        ...globals.node, // config files
        process: 'readonly', // process.env.*
        cordova: 'readonly',
        Capacitor: 'readonly',
      },
    },

    rules: {
      'prefer-promise-reject-errors': 'off',

      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

      ...ts_eslint_rules,
      ...stylistic_rules,
      ...vue_rules,
    },
  },

  {
    files: ['src-pwa/custom-service-worker.ts'],
    languageOptions: {
      globals: {
        ...globals.serviceworker,
      },
    },
  },
];
