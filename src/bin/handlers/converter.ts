import { $ } from 'execa';

import { normalize } from '../util.js';
import { colors, log, error, start, success, inputPrompt } from '../logger.js';

const { bold } = colors;

export async function convert(audio_path: string) {
  log('converter', audio_path);
  return;

  const input = (await inputPrompt(bold('Enter the name of the audio file you want to trim:'))) as string | undefined;
  if (!input) throw new TypeError('No "input" value provided.');

  const _convert = await $`\
    ffmpeg -i <input> -b:a 120K <output minus extension>.mp3
  `;
}
