/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4F5DFF',  // main color
          rgb: '79, 93, 255',
          contrast: '#ffffff',
          'contrast-rgb': '255, 255, 255',
          shade: '#4452e6',
          tint: '#6672ff',
        },
        secondary: {
          DEFAULT: '#FF8E3C',  // main color
          rgb: '255, 142, 60',
          contrast: '#ffffff',
          'contrast-rgb': '255, 255, 255',
          shade: '#e67d34',
          tint: '#ff9d57',
        },
        tertiary: {
          DEFAULT: '#16C79A',  // main color
          rgb: '22, 199, 154',
          contrast: '#ffffff',
          'contrast-rgb': '255, 255, 255',
          shade: '#14b387',
          tint: '#2ed3a6',
        },
        background: {
          DEFAULT: '#1A1F39',
          rgb: '26, 31, 57',
        },
        text: '#ffffff',
        light: '#f4f5f8',
        dark: '#222428',
        success: '#28A745',
        danger: '#FF3C3C',
        warning: '#FFC107',
      },
    },
  },
  plugins: [],
}
