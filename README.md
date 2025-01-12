# Soundboard
> **_“The Greatest Soundboard”_**

### Prerequisites
- [`pnpm`](https://pnpm.io) ^9
- [`node`](https://nodejs.org) ^20
- `SOUNDBOARD_KEYSTORE_PASS` environment variable to be set in order for the APK to be signed during build

### :information_source: Install the dependencies
```bash
pnpm install
```

### :information_source: Start the app in development mode

- #### As a web app (runs in a web browser)
  ```bash
  pnpm start
  # or 
  pnpm dev
  ```

- #### As an Android app (opens Android Studio)
  ```bash
  pnpm dev:mobile
  ```

### :information_source: Run the linter
```bash
pnpm lint
```

### :information_source: Build the app for production (includes signing the APK)
```bash
pnpm build
```

### :information_source: Customize the configuration
See [_Configuring quasar.config file_](https://quasar.dev/quasar-cli-vite/quasar-config-file) on the [Quasar website](https://quasar.dev).
