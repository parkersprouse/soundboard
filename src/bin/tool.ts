// Ensure the logger gets imported first so that Consola wraps the console logger immediately
import { colors, fatal, log, selectPrompt } from './logger.js';

import { convert } from './handlers/converter.js';
import { scrape } from './handlers/scraper.js';
import { trim } from './handlers/trimmer.js';

import { loadConfig } from './config.js';

enum MainLoopOption {
  CONVERT = 'convert',
  EXIT = 'exit',
  SCRAPE = 'scrape',
  TRIM = 'trim',
}

const { bold, dim, gray, yellow } = colors;

async function run() {
  process.title = 'Sound Drop Utility';

  const config = await loadConfig();
  const audio_path = config.audio_path?.toString();
  if (!audio_path) {
    fatal(new Error(`Missing required configuration key: ${yellow(audio_path)}`));
    process.exit(1);
  }

  const initial_column_length = Math.ceil(process.stdout.columns * (2 / 3));

  while (true) {
    log('\n', dim(gray('-'.repeat(initial_column_length))));

    const action: MainLoopOption
      = (await selectPrompt(bold('What would you like to do?'), {
        initial: 'encode',
        options: [
          { label: '1) Scrape audio from YouTube', value: MainLoopOption.SCRAPE },
          { label: '2) Trim audio file', value: MainLoopOption.TRIM },
          { label: '3) Convert audio file', value: MainLoopOption.CONVERT },
          { label: '[exit]', value: MainLoopOption.EXIT },
        ],
      })) as MainLoopOption;

    switch (action) {
      case MainLoopOption.CONVERT: {
        await convert(audio_path.toString());
        break;
      }
      case MainLoopOption.SCRAPE: {
        await scrape(audio_path.toString());
        break;
      }
      case MainLoopOption.TRIM: {
        await trim(audio_path.toString());
        break;
      }
      case MainLoopOption.EXIT:
      default:
        process.exit(0);
    }
  }
}

await run();
