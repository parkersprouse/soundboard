import { defineBoot } from '#q-app/wrappers';
import { APP_NAME, APP_TAGLINE } from 'src/constants.ts';

/**
 * import { inject } from 'vue';
 * ...
 * const $APP_NAME = inject('$APP_NAME');
 */
export default defineBoot(({ app }) => {
  app.provide('$APP_NAME', APP_NAME);
  app.provide('$APP_TAGLINE', APP_TAGLINE);
});
