<template>
  <q-page class='column items-center justify-start q-pa-md'>
    <q-input
      v-model='filter'
      class='full-width block q-mb-lg q-mt-sm'
      clearable
      debounce='100'
      filled
      label='Filter Drops'
      type='search'
    >
      <template #prepend>
        <q-icon :name='mdiMagnify' />
      </template>
    </q-input>

    <q-list
      class='fit column items-stretch justify-start drop-list'
      dark
    >
      <DropPlayer
        v-for='drop in filtered_drops'
        :key='drop.id'
        :drop='drop'
      />
    </q-list>
    <q-page-scroller
      position='bottom-right'
      :scroll-offset='150'
      :offset='[18, 18]'
    >
      <q-btn
        class='row align-center justify-center'
        color='accent'
        fab
      >
        <q-icon
          :name='mdiChevronUp'
          class='text-white'
        />
      </q-btn>
    </q-page-scroller>
  </q-page>
</template>

<script setup lang='ts'>
import { inject, ref, watch } from 'vue';
import { mdiMagnify, mdiChevronUp } from '@quasar/extras/mdi-v7';

import DropPlayer from 'src/components/DropPlayer.vue';

import type { Drop } from 'types/drop.d.ts';
import { set } from '@vueuse/core';


/*-- Injections / Utilities --*/

const $drops: Drop[] = inject('$drops')!;


/*-- Data --*/

const filter = ref<string>();
const filtered_drops = ref<Drop[]>([...$drops]);


/*-- Watchers --*/

watch(filter, (new_filter) => {
  if (!new_filter) set(filtered_drops, [...$drops]);
  else {
    const filtered = $drops.filter((drop) => drop.label.toLocaleLowerCase().includes(new_filter.toLocaleLowerCase()));
    set(filtered_drops, filtered);
  }
});
</script>

<style>
.drop-list {
  gap: 16px;
}
</style>

<style scoped>
.q-btn--rounded {
  border-radius: 100px;
  width: 56px;
  height: 56px;
}

.q-btn .q-icon {
  font-size: 2.5rem;
}
</style>
