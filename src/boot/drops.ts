import { defineBoot } from '#q-app/wrappers';

import type { Drop } from 'types/drop.d.ts';

function clean(str: string): string {
  return str.replace(/\W+/, '').toLocaleLowerCase();
}

/**
 * import { inject } from 'vue';
 *
 * import type { Drop } from 'types/drop.d.ts';
 * ...
 * const $drops: Drop[] = inject('$drops')!;
 */
export default defineBoot(({ app }) => {
  const drops: Drop[] = [
    {
      filename: 'breaking_news',
      id: 'd1eef21a-c4f2-42ff-8972-b4ac9033a55c',
      label: "You're breaking news, here",
    },
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
      filename: 'donuts',
      id: '9ce57d39-719c-411e-b42f-a011c55e4db0',
      label: 'Krispy Kreme Donuts',
    },
    {
      filename: 'everythings_computer',
      id: 'b437857b-1261-494d-bbc9-7fa7a7f69cb9',
      label: "Everything's Computer",
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
      filename: 'how_dare_you',
      id: '90e7d441-a1a7-4e2b-9cc3-d715581f3e09',
      label: 'First of all, how dare you?',
    },
    {
      filename: 'i_am_snarky',
      id: '3c019eb9-d57e-4873-a80e-ce66a0f93ccd',
      label: "I know, you're right, that is a problem I have.",
    },
    {
      filename: 'i_love_tesler',
      id: '43bc04f8-7457-4893-a39b-303f10c51289',
      label: 'I love Tesler!',
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
      filename: 'neil_breen_eughh',
      id: 'c92c290b-e627-45c2-a14e-a2256fefb92e',
      label: 'Who am I? What am I? Eughh!',
    },
    {
      filename: 'neil_breen_suicide',
      id: '79e1ad0b-55c4-4b74-a141-f319a9f3742d',
      label: "I can't believe you committed suicide :(",
    },
    {
      filename: 'not_true_and_false',
      id: '6e35f367-3245-40bd-8471-496b25deb396',
      label: 'That is not only not true, that is false.',
    },
    {
      filename: 'picture_of_house',
      id: '48091805-a8f8-42cc-a2d6-261b31208a61',
      label: 'Why do you send me a picture of my house?',
    },
    {
      filename: 'poopy_party',
      id: 'ec1e5e76-9c6d-4e8d-917a-8ca3116d3f93',
      label: 'The Party is Poopy',
    },
    {
      filename: 'poor',
      id: 'bd9caa8a-d2d4-4e6b-ac4d-dc23f665d54d',
      label: "You're fucking poor!",
    },
    {
      filename: 'reee',
      id: '714ec793-9d3d-4256-b342-9c48716e026c',
      label: 'Reeee',
    },
    {
      filename: 'revolution',
      id: '2d7d00e9-8e56-4754-b926-404d25e424ed',
      label: 'La Révolution up in this bitch',
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
      filename: 'the_way',
      id: '55c65d51-2a57-4772-9e3f-409c2c0f3628',
      label: 'Do you know the way?',
    },
    {
      filename: 'we_meet_again',
      id: '849fcd18-d698-491e-8568-3f2e50cea6a5',
      label: 'We meet again!',
    },
  ].sort((a, b) => clean(a.label).localeCompare(clean(b.label), undefined, {
    ignorePunctuation: true,
    numeric: true,
    caseFirst: 'false',
  }));

  app.provide('$drops', drops);
});
