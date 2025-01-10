import forms from '@tailwindcss/forms';
import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    fontFamily: {
      mono: ['Andale Mono']
    },
    extend: {}
  },

  plugins: [forms]
} satisfies Config;
