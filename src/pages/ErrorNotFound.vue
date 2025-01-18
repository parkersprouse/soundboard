<template>
  <q-layout view='lhr lpR lfr'>
    <q-page-container>
      <q-page class='fullscreen text-center q-pa-md flex column flex-center'>
        <h3
          id='error-title'
          ref='error_title'
          class='text-negative flex flex-center'
        >
          <q-icon :name='ionCloseCircleOutline' />
          Page Not Found
        </h3>

        <q-btn
          class='text-muted'
          color='secondary'
          flat
          no-caps
          padding='xs'
          size='lg'
          to='/'
        >
          <q-icon :name='ionChevronBackOutline' />
          <span class='q-pl-xs'>
            Back
          </span>
        </q-btn>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang='ts'>
import { App } from '@capacitor/app';
import { ionCloseCircleOutline, ionChevronBackOutline } from '@quasar/extras/ionicons-v7';
import { get, templateRef } from '@vueuse/core';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';


/*-- Injections / Utilities --*/

const $router = useRouter();


/*-- Data --*/

const error_title = templateRef<HTMLElement>('error_title');


/*-- Component Lifecycle --*/

onMounted(() => {
  App.addListener('backButton', () => {
    $router.replace('/');
  });

  const offset = document.body.offsetWidth;
  get(error_title).style.fontSize = `${offset * 0.65}%`;
});
</script>

<style scoped>
#error-title {
  font-size: 400%;
  gap: 0.25em;
}
</style>
