<template>
  <q-item
    class='bg-dark drop-list__item'
    :class='{ "drop-list__item--playing": playing }'
    clickable
    @click='onClick'
  >
    <q-item-section avatar>
      <q-icon
        :name='playing ? mdiStopCircleOutline : mdiPlayCircleOutline'
        size='4rem'
        class='text-primary'
      />
    </q-item-section>

    <q-item-section>
      &ldquo;{{ drop.label }}&rdquo;
    </q-item-section>
  </q-item>
</template>

<script setup lang='ts'>
import { mdiPlayCircleOutline, mdiStopCircleOutline } from '@quasar/extras/mdi-v7';
import { get, set } from '@vueuse/core';
import { Howl } from 'howler';
import { useQuasar } from 'quasar';
import { inject, onMounted, onUnmounted, ref } from 'vue';

import type { Drop } from 'src/types/drop.js';
import type { DropEventBus } from 'src/types/drop_event_bus.js';


/*-- Props --*/

const { drop } = defineProps<{
  drop: Drop;
}>();


/*-- Injections / Utilities --*/

const $bus: DropEventBus = inject('$bus') as DropEventBus;
const $q = useQuasar();


/*-- Data --*/

const audio = new Howl({
  autoplay: false,
  html5: false,
  loop: false,
  mute: false,
  pool: drop.files.length,
  preload: true,
  rate: 1,
  src: [...drop.files],
  volume: 1,
});
const playing = ref<boolean>(false);


/*-- Methods --*/

function onClick(): void {
  if (get(playing)) resetAudio();
  else {
    audio.play();
    $bus.emit('drop_started', drop.label);
  }
}

/* Audio Event Listeners */

function onDropStarted(label: string): void {
  if (label !== drop.label) resetAudio();
}

function resetAudio(): void {
  audio.stop();
  set(playing, false);
}

function handleError(_id: number, error: unknown): void {
  resetAudio();
  $q.notify({
    color: 'negative',
    message: `${drop.label} | ${error as Error}`,
  });
}


/*-- Component Lifecycle --*/

onMounted(() => {
  audio.on('loaderror', handleError);
  audio.on('playerror', handleError);
  audio.on('end', resetAudio);
  audio.on('play', () => {
    set(playing, true);
  });

  $bus.on('drop_started', onDropStarted);
  $bus.on('stop_all_drops', resetAudio);
});

onUnmounted(() => {
  audio.off();

  $bus.off('drop_started', onDropStarted);
  $bus.off('stop_all_drops', resetAudio);
});
</script>

<style>
.drop-list__item {
  border: 1px solid #ffffff47;
  border-radius: 4px;

  &.drop-list__item--playing {
    border-color: var(--q-primary) !important;
    background: var(--q-transparent-primary) !important;
  }
}
</style>
