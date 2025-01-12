<template>
  <q-item
    class='bg-dark drop-list__item'
    clickable
    @click='onClick'
  >
    <audio
      :id='domify(drop.label)'
      ref='audio_ele'
      preload='auto'
      style='display: none !important;'
    >
      <source
        v-for='file in drop.files'
        :key='domify(file)'
        :src='file'
        :type='`audio/${getFileType(file)}`'
      >
    </audio>
    <q-item-section avatar>
      <q-icon
        :name='playing ? evaStopCircle : evaPlayCircleOutline'
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
import { evaPlayCircleOutline, evaStopCircle } from '@quasar/extras/eva-icons';
import { get, set } from '@vueuse/core';
import { useQuasar } from 'quasar';
import { inject, onMounted, onUnmounted, ref, useTemplateRef, watch } from 'vue';

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

const audio_ele = useTemplateRef<HTMLAudioElement>('audio_ele');
const playing = ref<boolean>(false);


/*-- Watch --*/

watch(audio_ele, (new_val) => {
  console.log(new_val);
  if (!new_val) set(playing, false);
  else set(playing, !new_val);
}, { deep: true, flush: 'post' });


/*-- Methods --*/

function domify(text: string): string {
  return text.toLocaleLowerCase().trim().replace(/\s+/g, '_').replace(/\W+/g, '');
}

function getFileType(file: string): string | undefined {
  return file.split('.').at(-1);
}

function onClick(): void {
  resetPlayer();
  if (!get(playing)) {
    get(audio_ele)!.play()
      .then(() => {
        $bus.emit('drop_started', drop.label);
      })
      .catch((err) => {
        resetPlayer();
        $q.notify({
          color: 'negative',
          // message: `Failed to play "${drop.label}" :(`,
          message: `${drop.label} | ${err}`,
        });
      });
  }
}

/* Audio Event Listeners */

function onDropStarted(label: string): void {
  if (label !== drop.label) resetPlayer();
}

function onEnded(): void {
  resetPlayer();
}

function resetPlayer(): void {
  const player = get(audio_ele)!;
  if (get(playing)) player.pause();
  player.currentTime = 0;
}


/*-- Component Lifecycle --*/

onMounted(() => {
  get(audio_ele)!.addEventListener('ended', onEnded);

  $bus.on('drop_started', onDropStarted);
  $bus.on('stop_all_drops', resetPlayer);
});

onUnmounted(() => {
  get(audio_ele)!.removeEventListener('ended', onEnded);

  $bus.off('drop_started', onDropStarted);
  $bus.off('stop_all_drops', resetPlayer);
});
</script>

<style>
.drop-list__item {
  border: 1px solid #ffffff47;
  border-radius: 4px;
}
</style>
