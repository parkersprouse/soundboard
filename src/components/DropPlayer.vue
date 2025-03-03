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

    <q-item-section class='drop-list__item-text'>
      {{ drop.label }}
    </q-item-section>
  </q-item>
</template>

<script setup lang='ts'>
import { mdiPlayCircleOutline, mdiStopCircleOutline } from '@quasar/extras/mdi-v7';
import { get, set } from '@vueuse/core';
import { Howl } from 'howler';
import { useQuasar } from 'quasar';
import { inject, onMounted, onUnmounted, ref } from 'vue';

import type { HowlCallback, HowlErrorCallback } from 'howler';
import type { Drop } from 'types/drop.js';
import type { DropEventBus } from 'types/drop_event_bus.js';


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
    $bus.emit('drop_started', drop.id);
  }
}

/* Audio Event Listeners */

function onDropStarted(id: string): void {
  if (id !== drop.id) resetAudio();
}

function resetAudio(): void {
  audio.stop();
  set(playing, false);
}

function handleError(_id: number, error: unknown): void {
  resetAudio();

  let err = error;
  try {
    err = (err as Error).message;
  } catch { /* cannot convert error object to [Error] type */ }

  $q.notify({
    color: 'negative',
    message: `${drop.label} | ${err}`,
  });
}


/*-- Component Lifecycle --*/

onMounted(() => {
  audio.on('end', resetAudio as HowlCallback);
  audio.on('loaderror', handleError as HowlErrorCallback);
  audio.on('playerror', handleError as HowlErrorCallback);
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

  & .drop-list__item-text {
    white-space: pre-line;
  }
}
</style>
