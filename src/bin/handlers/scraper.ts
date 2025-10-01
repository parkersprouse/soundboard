import { $ } from 'execa';

import { normalize } from '../util.js';
import { colors, log, error, start, success, inputPrompt } from '../logger.js';

const { bold } = colors;

export async function scrape(audio_path: string) {
  log('scraper', audio_path);
  return;

  const _scrape = await $`\
    yt-dlp --console-title --progress --no-cache-dir --no-keep-fragments --no-mark-watched --no-overwrites \
    --cookies-from-browser firefox --restrict-filenames --windows-filenames --progress \
    --extractor-args 'youtube:max_comments=0,0,0,0;skip=translated_subs' -f 'ba' --paths 'tmp:/tmp' \
    --paths "home:\${PWD}" --output '<filename>.%(ext)s' <url> \
  `;
}
