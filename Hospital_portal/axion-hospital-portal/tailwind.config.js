/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
 
  ],
  safelist: [
    "bg-primary",
    "border-primary",
    "bg-muted",
    "border-muted",
    "translate-x-6",
    "translate-x-1"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}