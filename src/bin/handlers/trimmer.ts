import { basename, dirname, extname, join, resolve } from 'node:path';
import { $ } from 'execa';

import { normalize } from '../util.js';
import { colors, error, start, success, inputPrompt, log } from '../logger.js';

const { bold } = colors;

export async function trim(audio_path: string) {
  try {
    log('trimmer', audio_path);
    return;

    const input = (await inputPrompt(bold('Enter the name of the audio file you want to trim:'))) as string | undefined;
    if (!input) throw new TypeError('No "input" value provided.');

    const start_at_prompt = normalize('Enter the time you want to start trimming from (can be either number of seconds \
      from 0 or a timestamp in the format "00:00:00"):');
    const start_at = (await inputPrompt(bold(start_at_prompt))) as number | string | undefined;
    if (!start_at) throw new TypeError('No "start" value provided.');

    const duration_prompt = normalize('Enter the duration beginning from the "start at" time that should be trimmed \
      in total (can be either number of seconds or a timestamp in the format "00:00:00"):');
    const duration = (await inputPrompt(bold(duration_prompt))) as number | string | undefined;
    if (!duration) throw new TypeError('No "duration" value provided.');

    start('Beginning trim of ');

    // const file_ext = extname(input);
    // const output = resolve(join(dirname(input), `${basename(input, file_ext)}.trimmed.${file_ext}`));

    // const _trim = await $`ffmpeg -ss ${start_at} -i ${input} -to ${duration} -b:a 120K ${output}`;

    success('Audio successfully trimmed');
  } catch (err) {
    error(err as Error, '[Failed to trim audio file]');
  }
}
