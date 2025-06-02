<template>
  <q-page class='column items-center justify-start q-pa-md'>
    <q-list
      class='column items-stretch justify-stretch drop-list'
      dark
    >
      <DropPlayer
        v-for='drop in $drops'
        :key='drop.id'
        :drop='drop'
      />
    </q-list>
  </q-page>
</template>

<script setup lang='ts'>
import { inject } from 'vue';

import DropPlayer from 'src/components/DropPlayer.vue';

import type { Drop } from 'types/drop.d.ts';


/*-- Injections / Utilities --*/

const $drops: Drop[] = inject('$drops')!;
</script>

<style>
.drop-list {
  gap: 16px;
}
</style>
