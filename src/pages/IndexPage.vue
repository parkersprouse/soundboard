<template>
  <q-page class='column items-center justify-start q-pa-md'>
    <q-list
      class='column items-stretch justify-stretch drop-list'
      dark
    >
      <DropPlayer
        v-for='drop in drops'
        :key='drop.files.join("+")'
        :drop='drop'
      />
    </q-list>
  </q-page>
</template>

<script setup lang='ts'>
import DropPlayer from 'src/components/DropPlayer.vue';
import { ref } from 'vue';

import democracy_1 from 'assets/drops/democracy.webm';
import democracy_2 from 'assets/drops/democracy.mp3';
import handy_1 from 'assets/drops/handy.webm';
import handy_2 from 'assets/drops/handy.mp3';
import judo_1 from 'assets/drops/judo.webm';
import judo_2 from 'assets/drops/judo.mp3';
import ludwig_1 from 'assets/drops/ludwig.webm';
import ludwig_2 from 'assets/drops/ludwig.mp3';
import poor_1 from 'assets/drops/poor.webm';
import poor_2 from 'assets/drops/poor.mp3';
import succulent_1 from 'assets/drops/succulent.webm';
import succulent_2 from 'assets/drops/succulent.mp3';
import suey_1 from 'assets/drops/suey.webm';
import suey_2 from 'assets/drops/suey.mp3';

import type { Drop } from 'src/types/drop.d.ts';


/*-- Data --*/

const drops = ref<Drop[]>([
  {
    files: [democracy_1, democracy_2],
    label: 'This. Is. Democracy. Manifest.',
  },
  {
    files: [handy_1, handy_2],
    label: 'Get your hand off my penis!',
  },
  {
    files: [succulent_1, succulent_2],
    label: 'What is the charge?!',
  },
  {
    files: [judo_1, judo_2],
    label: 'I see that you know your Judo well',
  },
  {
    files: [ludwig_1, ludwig_2],
    label: 'Put a fucking bullet through my FUCKING SKULL',
  },
  {
    files: [poor_1, poor_2],
    label: "You're fucking poor!",
  },
  {
    files: [suey_1, suey_2],
    label: 'Thought about killing myself',
  },
]);
</script>

<style>
.drop-list {
  gap: 16px;
}
</style>
