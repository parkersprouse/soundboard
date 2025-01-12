// https://v2.quasar.dev/quasar-cli-vite/quasar-config-file
import { defineConfig } from '#q-app/wrappers';

import { APP_NAME, APP_TAGLINE } from './src/constants.ts';

export default defineConfig((/* ctx */) => {
  return {
    boot: [
      'app_meta',
      'event_bus',
    ],

    build: {
      analyze: false, // Generates and opens an HTML report of the analyzed production bundle
      extendViteConf(config) {
        config.build ??= {};
        config.css ??= {};
        config.build.cssMinify = 'lightningcss';
        config.css.transformer = 'lightningcss';
      },
      htmlMinifyOptions: {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        removeAttributeQuotes: false,
        removeComments: true,
        removeScriptTypeAttributes: true,
      },
      rebuildCache: true, // rebuilds Vite/linter/etc cache on startup
      sourcemap: false,
      target: {
        browser: ['es2022', 'firefox115', 'chrome115', 'safari14'],
        node: 'node20',
      },
      typescript: {
        extendTsConfig(config) {
          config.compilerOptions ??= {};
          config.compilerOptions.allowImportingTsExtensions = true;
        },
        strict: true,
        vueShim: true,
      },
      useFilenameHashes: true,
      vitePlugins: [
        [
          'vite-plugin-checker', {
            vueTsc: true,
            eslint: {
              lintCommand: 'eslint -c ./eslint.config.js "./src*/**/*.{ts,js,mjs,cjs,vue}"',
              useFlatConfig: true,
            },
          },
          {
            server: false,
          },
        ],
      ],
      vueRouterMode: 'hash', // 'hash' | 'history'
    },

    capacitor: {
      appName: APP_NAME,
      description: APP_TAGLINE,
      hideSplashscreen: true,
    },

    css: [
      'app.css',
    ],

    devServer: {
      open: false,
    },

    extras: [
      'eva-icons',
    ],

    framework: {
      config: {
        brand: {
          primary: '#0078a7',
          secondary: '#272a2d',
          accent: '#7b4c9e',

          dark: '#18191b',
          'dark-page': '#111113',

          positive: '#2f7c57',
          negative: '#b54548',
          info: '#0061ae',
          warning: '#d36100',
        },
        capacitor: {
          // let Quasar exit the app on mobile back button trigger
          backButtonExit: false,
          // or, completely disable Quasar's back button management
          backButton: false,
        },
        dark: true,
        // for debugging the prod build
        notify: {
          closeBtn: true,
          color: 'secondary',
          position: 'bottom',
          timeout: 0,
        },
        screen: {
          // .screen--xs --> .screen-xl auto-added
          bodyClasses: true,
        },
      },
      iconSet: 'eva-icons',
      lang: 'en-US',
      plugins: [
        'Notify', // for debugging the prod build
        /*
         - https://github.com/capacitor-community/native-audio
         - https://capawesome.io/plugins/app-shortcuts/
         - https://capawesome.io/plugins/live-update/
         - https://quasar.dev/options/screen-plugin
         */
      ],
    },

    sourceFiles: {
      rootComponent: 'src/App.vue',
      router: 'src/router/index',
      store: 'src/stores/index',
    },
  };
});