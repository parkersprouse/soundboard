import { readFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';

import { parse } from 'smol-toml';
import { fatal, colors } from './logger.js';

import type { TomlTable } from 'smol-toml';

const { yellow } = colors;

function verifyConfig(config: TomlTable) {
  const REQUIRED_VARS = Object.freeze([
    'audio_path',
  ]);

  for (const v of REQUIRED_VARS) {
    if (!config[v]) {
      fatal(new Error(`Missing required configuration key: ${yellow(v)}`));
      process.exit(1);
    }
  }
}

async function readConfig(path: string) {
  try {
    return await readFile(path);
  } catch (e) {
    const err = e as Error;
    if (err.message.includes('ENOENT')) {
      err.message = `Configuration file ${yellow('config.toml')} not found in ${yellow('bin/')} folder`;
      fatal(err);
      process.exit(1);
    }
    throw err;
  }
}

export async function loadConfig() {
  const root = resolve('.');
  const path = join(root, 'bin', 'config.toml');
  const contents = await readConfig(path);
  const config = parse(contents.toString());

  verifyConfig(config);
  return config;
}
