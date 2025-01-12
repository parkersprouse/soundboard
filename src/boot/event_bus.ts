import { defineBoot } from '#q-app/wrappers';
import { EventBus } from 'quasar';

import type { DropEventBus } from 'src/types/drop_event_bus.d.ts';

/**
 * import { inject } from 'vue';
 * ...
 * const $bus = inject('$bus');
 * ...
 * bus.on('drop_started', (label) => { ... });
 * ...
 * bus.emit('drop_stopped', 'drop label');
 */
export default defineBoot(({ app }) => {
  const bus: DropEventBus = new EventBus() as DropEventBus;
  app.provide('$bus', bus);
});
