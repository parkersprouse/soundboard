import { defineBoot } from '#q-app/wrappers';
import { SafeArea } from '@capacitor-community/safe-area';

export default defineBoot(() => {
  // @SEE: https://github.com/capacitor-community/safe-area#configuration for config reference
  SafeArea.enable({
    config: {
      customColorsForSystemBars: true,
      navigationBarColor: '#111113',
      navigationBarContent: 'light',
      offset: 0,
      statusBarColor: '#111113',
      statusBarContent: 'light',
    },
  });
});
