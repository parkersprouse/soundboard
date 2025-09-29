<template>
  <q-item
    class='bg-dark drop-list__item full-width'
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
import { inject, onBeforeMount, onUnmounted, ref } from 'vue';

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

let audio: Howl;

const playing = ref<boolean>(false);


/*-- Methods --*/

function onClick(): void {
  if (get(playing)) resetAudio();
  else {
    const play = () => {
      audio.play();
      $bus.emit('drop_started', drop.id);
    };
    if (!audio) loadAudioFiles().then(play);
    else play();
  }
}

/* Audio Event Listeners */

function onDropStarted(id: string): void {
  if (id !== drop.id) resetAudio();
}

function resetAudio(): void {
  audio?.stop();
  set(playing, false);
}

function handleError(_id: number, error: unknown): void {
  resetAudio();

  let err = error;
  try {
    err = (err as Error).message;
  } catch { /* failed to convert error object to [Error] type */ }

  $q.notify({
    color: 'negative',
    message: `${drop.label} | ${err}`,
  });
}

async function loadAudioFiles() {
  const loaded_filenames: string[] = [];

  try {
    const loaded_webm = await import(`../assets/drops/${drop.filename}.webm`);
    loaded_filenames.push(loaded_webm.default);
  } catch { /* */ }

  try {
    const loaded_mp3 = await import(`../assets/drops/${drop.filename}.mp3`);
    loaded_filenames.push(loaded_mp3.default);
  } catch { /* */ }


  audio = new Howl({
    autoplay: false,
    html5: false,
    loop: false,
    mute: false,
    preload: false,
    rate: 1,
    src: [...loaded_filenames.sort((name) => name.endsWith('.webp') ? 1 : -1)],
    volume: 1,
  });

  audio.on('end', resetAudio as HowlCallback);
  audio.on('loaderror', handleError as HowlErrorCallback);
  audio.on('playerror', handleError as HowlErrorCallback);
  audio.on('play', () => {
    set(playing, true);
  });

  audio.load();
}


/*-- Component Lifecycle --*/

onBeforeMount(async () => {
  $bus.on('drop_started', onDropStarted);
  $bus.on('stop_all_drops', resetAudio);
});

onUnmounted(() => {
  audio?.off();

  $bus.off('drop_started', onDropStarted);
  $bus.off('stop_all_drops', resetAudio);
});
</script>

<style>
.drop-list__item {
  border: 1px solid #ffffff47;
  border-radius: 4px;

  @media screen and (hover: hover) {
    &:hover {
      background: var(--q-transparent-primary) !important;
    }
  }

  &.drop-list__item--playing {
    border-color: var(--q-primary) !important;
    background: var(--q-transparent-primary) !important;
  }

  & .drop-list__item-text {
    white-space: pre-line;
  }

  & .q-focus-helper {
    display: none !important;
    opacity: 0 !important;
  }
}
</style>
