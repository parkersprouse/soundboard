/* eslint-disable @typescript-eslint/no-explicit-any */
import { consola } from 'consola';
import { box, colors } from 'consola/utils';

import type {
  ConfirmPromptOptions,
  PromptOptions,
  SelectPromptOptions,
  TextPromptOptions,
} from 'consola';
import type { BoxOpts, ColorName } from 'consola/utils';

export { colors } from 'consola/utils';

/**
 * Duplicate type from Consola since they don't export it themselves
 * @see <https://github.com/unjs/consola/blob/main/src/prompt.ts#L3-L7>
 */
export interface SelectOption {
  hint?: string;
  label: string;
  value: string;
}

export interface LogBoxOpts {
  color?: ColorName;
  title?: string;
}

/**
 * Duplicate type from Consola since they don't export it themselves
 * @see <https://github.com/unjs/consola/blob/main/src/prompt.ts#L115-L140>
 */
export type PromptReturnType = string | boolean | SelectOption | (string | SelectOption)[] | undefined;


consola.wrapConsole();


const { bold, cyan, greenBright, redBright, yellowBright } = colors;

/**
 * @param {Error} err
 * @param {string | undefined} prefix
 */
function createErrorLogPayload(err: Error, prefix?: string) {
  let { message } = err;

  message = redBright(bold(message || err.toString())).trim();
  if (prefix) message = `${redBright(prefix.trimEnd())} ${message}`;

  return {
    message,
    stack: err.stack,
  };
}

/**
 * @param {Error} err
 * @param {string | undefined} prefix
 */
export function error(err: Error, prefix?: string): void {
  const payload = createErrorLogPayload(err, prefix);
  consola.error(payload);
}

/**
 * @param {Error} err
 * @param {string | undefined} prefix
 */
export function fatal(err: Error, prefix?: string): void {
  const payload = createErrorLogPayload(err, prefix);
  consola.fatal(payload);
}

/**
 * @param {string | number} message
 * @param {any[]} ...args
 */
export function info(message: string | number, ...args: any[]): void {
  consola.info(cyan(message), ...args);
}

/**
 * @param {string | number} message
 * @param {any[]} ...args
 */
export function log(message: string | number, ...args: any[]): void {
  consola.log(message, ...args);
}

/**
 * @param {string | number} message
 * @param {any[]} ...args
 */
export function warn(message: string | number, ...args: any[]): void {
  consola.warn(yellowBright(message), ...args);
}

/**
 * @param {string | number} message
 * @param {any[]} ...args
 */
export function start(message: string | number, ...args: any[]): void {
  consola.start(message, ...args);
}

/**
 * @param {string | number} message
 * @param {any[]} ...args
 */
export function success(message: string | number, ...args: any[]): void {
  consola.success(greenBright(message), ...args);
}


/* --------------------- *
 *      Box Helpers      *
 * --------------------- */

/**
 * @param {string} message
 * @param {LogBoxOpts | undefined} [opts={}]
 * @param {any[]} ...args
 */
export function logBox(message: string, opts: LogBoxOpts = {}, ...args: any[]): void {
  consola.log(
    box(message, {
      title: opts.title || undefined, // avoid allowing empty strings
      style: {
        borderColor: opts.color,
      },
    } as BoxOpts),
    ...args,
  );
}

/**
 * @param {string} message
 * @param {string | undefined} title
 * @param {any[]} ...args
 */
export function successBox(message: string, title?: string, ...args: any[]): void {
  consola.success(
    box(greenBright(message), {
      title: title ? bold(greenBright(title)) : undefined,
      style: {
        borderColor: 'green',
      },
    } as BoxOpts),
    ...args,
  );
}


/* ----------------- *
 *      Prompts      *
 * ----------------- */

/**
 * @param {string} message
 * @param {PromptOptions | undefined} [opts={}]
 * @returns
 */
export async function prompt(
  message: string,
  opts: PromptOptions = {},
): Promise<PromptReturnType> {
  return await consola.prompt(message, {
    cancel: 'undefined',
    ...opts,
  });
}

/**
 * @param {string} message
 * @param {Omit<ConfirmPromptOptions, 'type'>} opts
 * @returns
 */
export async function confirmPrompt(
  message: string,
  opts: Omit<ConfirmPromptOptions, 'type'> = {},
): Promise<PromptReturnType> {
  return await prompt(message, {
    ...opts,
    type: 'confirm',
  });
}

/**
 * @param {string} message
 * @param {Omit<TextPromptOptions, 'type'>} opts
 * @returns
 */
export async function inputPrompt(
  message: string,
  opts: Omit<TextPromptOptions, 'type'> = {},
): Promise<PromptReturnType> {
  return await prompt(message, {
    ...opts,
    type: 'text',
  });
}

/**
 * @param {string} message
 * @param {Omit<SelectPromptOptions, 'type'>} opts
 * @returns
 */
export async function selectPrompt(
  message: string,
  opts: Omit<SelectPromptOptions, 'type'>,
): Promise<PromptReturnType> {
  return await prompt(message, {
    ...opts,
    type: 'select',
  });
}
