<template>
  <q-page class='column items-center justify-start q-pa-md'>
    <q-list
      class='column items-stretch justify-stretch drop-list'
      dark
    >
      <DropPlayer
        v-for='drop in drops'
        :key='drop.id'
        :drop='drop'
      />
    </q-list>
  </q-page>
</template>

<script setup lang='ts'>
import { uid } from 'quasar';

import DropPlayer from 'src/components/DropPlayer.vue';

import bullet_1 from 'assets/drops/bullet.webm';
import bullet_2 from 'assets/drops/bullet.mp3';
import chainsaw_1 from 'assets/drops/chainsaw.webm';
import chainsaw_2 from 'assets/drops/chainsaw.mp3';
import cock_in_mouth_1 from 'assets/drops/cock_in_mouth.webm';
import cock_in_mouth_2 from 'assets/drops/cock_in_mouth.mp3';
import cooler_1 from 'assets/drops/cooler.webm';
import cooler_2 from 'assets/drops/cooler.mp3';
import democracy_1 from 'assets/drops/democracy.webm';
import democracy_2 from 'assets/drops/democracy.mp3';
import ew_brother_1 from 'assets/drops/ew_brother.webm';
import ew_brother_2 from 'assets/drops/ew_brother.mp3';
import guillotine_1 from 'assets/drops/guillotine.webm';
import guillotine_2 from 'assets/drops/guillotine.mp3';
import handy_1 from 'assets/drops/handy.webm';
import handy_2 from 'assets/drops/handy.mp3';
import its_a_bible_1 from 'assets/drops/its_a_bible.webm';
import its_a_bible_2 from 'assets/drops/its_a_bible.mp3';
import judo_1 from 'assets/drops/judo.webm';
import judo_2 from 'assets/drops/judo.mp3';
import picture_of_house_1 from 'assets/drops/picture_of_house.webm';
import picture_of_house_2 from 'assets/drops/picture_of_house.mp3';
import poor_1 from 'assets/drops/poor.webm';
import poor_2 from 'assets/drops/poor.mp3';
import shhh_1 from 'assets/drops/shhh.webm';
import shhh_2 from 'assets/drops/shhh.mp3';
import slapaphone_1 from 'assets/drops/slapaphone.webm';
import slapaphone_2 from 'assets/drops/slapaphone.mp3';
import slop_daddy_1 from 'assets/drops/slop_daddy.webm';
import slop_daddy_2 from 'assets/drops/slop_daddy.mp3';
import succulent_1 from 'assets/drops/succulent.webm';
import succulent_2 from 'assets/drops/succulent.mp3';
import suey_1 from 'assets/drops/suey.webm';
import suey_2 from 'assets/drops/suey.mp3';
import we_meet_again_1 from 'assets/drops/we_meet_again.webm';
import we_meet_again_2 from 'assets/drops/we_meet_again.mp3';

import type { Drop } from 'types/drop.d.ts';


/*-- Data --*/

const drops: Drop[] = [
  {
    files: [bullet_1, bullet_2],
    id: uid(),
    label: 'Put a fucking bullet through my FUCKING SKULL',
  },
  {
    files: [chainsaw_1, chainsaw_2],
    id: uid(),
    label: 'CHAINSAW!',
  },
  {
    files: [cock_in_mouth_1, cock_in_mouth_2],
    id: uid(),
    label: "I can't wait to have your cock in my mouth",
  },
  {
    files: [cooler_1, cooler_2],
    id: uid(),
    label: "It'd be a lot cooler if you did",
  },
  {
    files: [democracy_1, democracy_2],
    id: uid(),
    label: 'This. Is. Democracy. Manifest.',
  },
  {
    files: [ew_brother_1, ew_brother_2],
    id: uid(),
    label: "Brother, ew. What's that?",
  },
  {
    files: [guillotine_1, guillotine_2],
    id: uid(),
    label: 'Make Guillotines Great Again',
  },
  {
    files: [handy_1, handy_2],
    id: uid(),
    label: 'Get your hand off my penis!',
  },
  {
    files: [its_a_bible_1, its_a_bible_2],
    id: uid(),
    label: "- Is that your bible?\n- It's a bible",
  },
  {
    files: [judo_1, judo_2],
    id: uid(),
    label: 'I see that you know your Judo well',
  },
  {
    files: [picture_of_house_1, picture_of_house_2],
    id: uid(),
    label: 'Why do you send me a picture of my house?',
  },
  {
    files: [poor_1, poor_2],
    id: uid(),
    label: "You're fucking poor!",
  },
  {
    files: [shhh_1, shhh_2],
    id: uid(),
    label: 'Shh, be quiet!',
  },
  {
    files: [slapaphone_1, slapaphone_2],
    id: uid(),
    label: 'Slapaphone!',
  },
  {
    files: [slop_daddy_1, slop_daddy_2],
    id: uid(),
    label: 'Slop it up for me, daddy',
  },
  {
    files: [succulent_1, succulent_2],
    id: uid(),
    label: 'What is the charge?!',
  },
  {
    files: [suey_1, suey_2],
    id: uid(),
    label: 'Thought about killing myself',
  },
  {
    files: [we_meet_again_1, we_meet_again_2],
    id: uid(),
    label: 'We meet again!',
  },
].sort((a, b) => a.label.toLocaleLowerCase().localeCompare(b.label.toLocaleLowerCase()));
</script>

<style>
.drop-list {
  gap: 16px;
}
</style>
