import { defineConfig, presetUno, presetAttributify, presetIcons } from 'unocss';

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      collections: {
        mdi: () => import('@iconify/json/json/mdi.json').then(i => i.default),
        heroicons: () => import('@iconify/json/json/heroicons.json').then(i => i.default),
        bitcoinicons: () => import('@iconify/json/json/bitcoin-icons.json').then(i => i.default),
      }
    })
  ],
  safelist: [
    'text-green-400',
    'bg-green-500/10',
    'text-cyan-400',
    'bg-cyan-500/10',
    'text-indigo-600',
    'bg-indigo-500/10',
    'text-red-400',
    'bg-red-500/10',
  ],
  theme: {
    colors: {
      primary: {
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#93c5fd',
        400: '#60a5fa',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
        800: '#1e40af',
        900: '#1e3a8a',
      },
      secondary: {
        50: '#faf5ff',
        100: '#f3e8ff',
        200: '#e9d5ff',
        300: '#d8b4fe',
        400: '#c084fc',
        500: '#a855f7',
        600: '#9333ea',
        700: '#7c3aed',
        800: '#6b21a8',
        900: '#581c87',
      }
    }
  }
});
