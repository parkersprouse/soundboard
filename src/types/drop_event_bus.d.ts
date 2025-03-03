import { EventBus } from 'quasar';

export type DropEventBus = EventBus<{
  drop_started: (id: string) => void;
  stop_all_drops: () => void;
}>;
