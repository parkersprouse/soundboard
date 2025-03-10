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
import DropPlayer from 'src/components/DropPlayer.vue';

import type { Drop } from 'types/drop.d.ts';


/*-- Data --*/

const drops: Drop[] = [
  {
    filename: 'bullet',
    id: 'c7d9686b-0968-454d-ba69-ae5721224139',
    label: 'Put a fucking bullet through my FUCKING SKULL',
  },
  {
    filename: 'chainsaw',
    id: '212035cd-b204-4acf-8727-f289f09e1f7b',
    label: 'CHAINSAW!',
  },
  {
    filename: 'cock_in_mouth',
    id: '60d05103-d693-4d11-a982-9177f584f2b9',
    label: "I can't wait to have your cock in my mouth",
  },
  {
    filename: 'cooler',
    id: '10d2324e-7726-4977-9251-0ffde400f758',
    label: "It'd be a lot cooler if you did",
  },
  {
    filename: 'democracy',
    id: '12378595-cf3b-47cc-ab27-726b1733522b',
    label: 'This. Is. Democracy. Manifest.',
  },
  {
    filename: 'ew_brother',
    id: 'ce4d38d9-ac71-4221-9824-0022266f4fa6',
    label: "Brother, ew. What's that?",
  },
  {
    filename: 'guillotine',
    id: 'db812113-6983-44b2-9b33-b8f3447d491d',
    label: 'Make Guillotines Great Again',
  },
  {
    filename: 'handy',
    id: '9e888396-c797-47a4-b811-470786697430',
    label: 'Get your hand off my penis!',
  },
  {
    filename: 'its_a_bible',
    id: 'd559db4e-c6da-48a2-90aa-991ce12467ed',
    label: "- Is that your bible?\n- It's a bible",
  },
  {
    filename: 'judo',
    id: 'c4b765c9-10d8-4a6d-a813-b1d0d8181afd',
    label: 'I see that you know your Judo well',
  },
  {
    filename: 'picture_of_house',
    id: '48091805-a8f8-42cc-a2d6-261b31208a61',
    label: 'Why do you send me a picture of my house?',
  },
  {
    filename: 'poor',
    id: 'bd9caa8a-d2d4-4e6b-ac4d-dc23f665d54d',
    label: "You're fucking poor!",
  },
  {
    filename: 'shhh',
    id: '7fb38a78-3101-42c1-b479-4c9e029e87d5',
    label: 'Shh, be quiet!',
  },
  {
    filename: 'slapaphone',
    id: '62a36d56-27fb-47b5-ad46-28d71c48b892',
    label: 'Slapaphone!',
  },
  {
    filename: 'slop_daddy',
    id: 'b74d34d0-75ce-4aa8-b3fe-5557552e7715',
    label: 'Slop it up for me, daddy',
  },
  {
    filename: 'the_way',
    id: '55c65d51-2a57-4772-9e3f-409c2c0f3628',
    label: 'Do you know the way?',
  },
  {
    filename: 'succulent',
    id: '0d811a76-e370-4c5b-bbe3-51bf1285d7b2',
    label: 'What is the charge?!',
  },
  {
    filename: 'suey',
    id: 'f17e798f-c972-4af2-b8b5-e5af2fc80480',
    label: 'Thought about killing myself',
  },
  {
    filename: 'we_meet_again',
    id: '849fcd18-d698-491e-8568-3f2e50cea6a5',
    label: 'We meet again!',
  },
].sort((a, b) => a.label.replace(/\W+/, '').toLocaleLowerCase()
  .localeCompare(b.label.replace(/\W+/, '').toLocaleLowerCase()));
</script>

<style>
.drop-list {
  gap: 16px;
}
</style>
