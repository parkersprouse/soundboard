<template>
  <router-view />
</template>

<script setup lang='ts'>
import { App } from '@capacitor/app';
import { inject, onMounted } from 'vue';

import type { DropEventBus } from 'src/types/drop_event_bus.d.ts';


/*-- Injections / Utilities --*/

const $bus: DropEventBus = inject('$bus') as DropEventBus;


/*-- Component Lifecycle --*/

onMounted(() => {
  App.addListener('pause', () => {
    $bus.emit('stop_all_drops');
  });

  /* potentially reinitialize the event bus
  App.addListener('resume', () => {});
  */
});
</script>
