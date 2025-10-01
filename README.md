# Soundboard
> **_“The Greatest Soundboard”_**

## Prerequisites
- [`pnpm`](https://pnpm.io) ^10
- [`node`](https://nodejs.org) ^22.20
- `SOUNDBOARD_KEYSTORE_PASS` environment variable to be set in order for the APK to be signed during build

## Install the dependencies
```shell
pnpm install
```

## Start the app in development mode

- ### As a web app (runs in a web browser)
  ```shell
  pnpm start
  ```
  or
  ```
  pnpm dev
  ```

- ### As an Android app (opens Android Studio)
  ```shell
  pnpm dev:mobile
  ```

## Run the linter
```shell
pnpm lint
```

## Build the app for production (includes signing the APK)
```shell
pnpm build
```

## Customize the configuration
See [_Configuring quasar.config file_](https://quasar.dev/quasar-cli-vite/quasar-config-file) on the [Quasar website](https://quasar.dev).


## Acquiring Sound Drops

These are the CLI commands that I personally use to grab audio files, trim them down to the appropriate length, and convert them to `.mp3` files for portability.  
You're not required to use them yourself if you have an alternate way of providing compatible audio files.

> [!IMPORTANT]  
> In order to run the following commands, [ffmpeg](https://ffmpeg.org/download.html) and [yt-dlp](https://github.com/yt-dlp/yt-dlp#installation) must be available on your system.

- This will download _**only**_ the audio from the provided `<url>` and save it in the current directory with the name `<filename>` (the extension is set automatically).
  ```shell
  yt-dlp --console-title --progress --no-cache-dir --no-keep-fragments --no-mark-watched --no-overwrites \
  --cookies-from-browser firefox --restrict-filenames --windows-filenames --progress \
  --extractor-args 'youtube:max_comments=0,0,0,0;skip=translated_subs' -f 'ba' --paths 'tmp:/tmp' \
  --paths "home:${PWD}" --output '<filename>.%(ext)s' <url>
  ```

- This will trim the `<input>` file from `<start timestamp>` (format `<hours>:<minutes>:<seconds>.<milliseconds>`)  
  for `<duration from start timestamp>` length of time (same format - ex. a duration of 3.5 seconds would be `00:00:03.5`),  
  and save it as `<output>` (_**make sure to use the same file extension - e.g. `.webm`**_).
  ```shell
  ffmpeg -ss <start timestamp> -i <input> -to <duration from start timestamp> -b:a 120K <output>
  ```

- Finally, this will convert the trimmed `<input>` audio file into an `.mp3` file that can be played basically anywhere.
  ```shell
  ffmpeg -i <input> -b:a 120K <output minus extension>.mp3
  ```
