<template>
  <q-layout view='hHh lpR fFf'>
    <q-header
      id='app-header'
      class='bg-dark text-light'
    >
      <q-toolbar class='text-center'>
        <q-toolbar-title v-if='$APP_TAGLINE'>
          {{ $APP_TAGLINE }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>

  <q-dialog
    v-model='exit_dialog_open'
    backdrop-filter='blur(6px)'
  >
    <q-card class='no-shadow'>
      <q-card-section class='row items-center'>
        <q-avatar
          class='text-negative'
          :icon='mdiAlertCircleOutline'
        />
        <span>Are you sure you want to quit?</span>
      </q-card-section>

      <q-card-actions align='right'>
        <q-btn
          v-close-popup
          aria-label='No'
          flat
          padding='0.25em 1em'
          label='No'
        />
        <q-btn
          aria-label='Yes'
          color='negative'
          flat
          label='Yes'
          padding='0.25em 1em'
          @click='exitApp'
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang='ts'>
import { App } from '@capacitor/app';
import { mdiAlertCircleOutline } from '@quasar/extras/mdi-v7';
import { set } from '@vueuse/core';
import { inject, onMounted, ref } from 'vue';


/*-- Injections / Utilities --*/

const $APP_TAGLINE = inject('$APP_TAGLINE');


/*-- Data --*/

const exit_dialog_open = ref(false);


/*-- Methods --*/

function exitApp() {
  App.exitApp();
}

function showConfirmExit() {
  set(exit_dialog_open, true);
}


/*-- Component Lifecycle --*/

onMounted(() => {
  App.addListener('backButton', showConfirmExit);
});
</script>

<style>
#app-header {
  &.q-header {
    border-color: rgba(255, 255, 255, 0.1);
    border-style: solid;
    border-width: 1px 0;

    & .q-toolbar {
      gap: 0.5rem;

      & .q-toolbar__title {
        padding: 0;
      }
    }
  }
}
</style>
