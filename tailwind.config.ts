import forms from '@tailwindcss/forms';
import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    fontFamily: {
      sans: ['Open Sauce']
    },
    extend: {}
  },

  plugins: [forms]
} satisfies Config;
