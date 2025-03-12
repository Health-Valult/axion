/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
	  "./pages/**/*.{js,ts,jsx,tsx}",
	  "./components/**/*.{js,ts,jsx,tsx}",
	  "./app/**/*.{js,ts,jsx,tsx,}",
	  "./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
	  container: {
		center: true,
		padding: "2rem",
		screens: {
		  "2xl": "1400px",
		},
	  },
	  extend: {
		colors: {
		  border: "hsl(var(--border))",
		  input: "hsl(var(--input))",
		  ring: "hsl(var(--ring))",
		  background: "hsl(var(--background))",
		  foreground: "hsl(var(--foreground))",
		  primary: {
			DEFAULT: "hsl(var(--primary))",
			foreground: "hsl(var(--primary-foreground))",
		  },
		  secondary: {
			DEFAULT: "hsl(var(--secondary))",
			foreground: "hsl(var(--secondary-foreground))",
		  },
		  destructive: {
			DEFAULT: "hsl(var(--destructive))",
			foreground: "hsl(var(--destructive-foreground))",
		  },
		  muted: {
			DEFAULT: "hsl(var(--muted))",
			foreground: "hsl(var(--muted-foreground))",
		  },
		  accent: {
			DEFAULT: "hsl(var(--accent))",
			foreground: "hsl(var(--accent-foreground))",
		  },
		  popover: {
			DEFAULT: "hsl(var(--popover))",
			foreground: "hsl(var(--popover-foreground))",
		  },
		  card: {
			DEFAULT: "hsl(var(--card))",
			foreground: "hsl(var(--card-foreground))",
		  },
		  sidebar: {
			DEFAULT: "hsl(var(--sidebar-background))",
			foreground: "hsl(var(--sidebar-foreground))",
			primary: "hsl(var(--sidebar-primary))",
			"primary-foreground": "hsl(var(--sidebar-primary-foreground))",
			accent: "hsl(var(--sidebar-accent))",
			"accent-foreground": "hsl(var(--sidebar-accent-foreground))",
			border: "hsl(var(--sidebar-border))",
			ring: "hsl(var(--sidebar-ring))",
		  },
		},
		borderRadius: {
		  lg: "var(--radius)",
		  md: "calc(var(--radius) - 2px)",
		  sm: "calc(var(--radius) - 4px)",
		},
		keyframes: {
		  "accordion-down": {
			from: { height: "0" },
			to: { height: "var(--radix-accordion-content-height)" },
		  },
		  "accordion-up": {
			from: { height: "var(--radix-accordion-content-height)" },
			to: { height: "0" },
		  },
		  fadeIn: {
			from: { opacity: "0", transform: "translateY(10px)" },
			to: { opacity: "1", transform: "translateY(0)" },
		  },
		  shimmer: {
			from: { backgroundPosition: "0 0" },
			to: { backgroundPosition: "-200% 0" },
		  },
		  scale: {
			from: { transform: "scale(0.95)" },
			to: { transform: "scale(1)" },
		  },
		  float: {
			"0%, 100%": { transform: "translateY(0)" },
			"50%": { transform: "translateY(-10px)" },
		  },
		},
		animation: {
		  "accordion-down": "accordion-down 0.2s ease-out",
		  "accordion-up": "accordion-up 0.2s ease-out",
		  "fade-in": "fadeIn 0.5s ease-out forwards",
		  shimmer: "shimmer 2s infinite linear",
		  "scale-in": "scale 0.2s ease-out",
		  float: "float 3s ease-in-out infinite",
		},
		transitionDuration: {
		  "400": "400ms",
		},
		transitionTimingFunction: {
		  app: "cubic-bezier(0.2, 0.8, 0.2, 1)",
		},
		backdropBlur: {
			xs: '2px',
			sm: '4px',
			md: '8px',
			lg: '12px',
			xl: '16px',
			'2xl': '24px',
			'3xl': '64px',
		  },
	  },
	},
	plugins: [
		require("tailwindcss-animate"),
		require("tailwindcss-filters"),
	],
  }
  
// /** @type {import('tailwindcss').Config} */
// module.exports = {
// 	content: [
// 		"./components/**/*.{js,ts,jsx,tsx,mdx}",
// 		"./app/**/*.{js,ts,jsx,tsx,mdx}",
// 		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
// 		"./src/**/*.{js,ts,jsx,tsx,mdx}",
// 	//   './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
// 	//   './pages/**/*.{js,ts,jsx,tsx,mdx}',
// 	//   './components/**/*.{js,ts,jsx,tsx,mdx}',
// 	//   "./pages/**/*.{ts,tsx}",


   
// 	],
// 	safelist: [
// 	  "bg-primary",
// 	  "border-primary",
// 	  "bg-muted",
// 	  "border-muted",
// 	  "translate-x-6",
// 	  "translate-x-1"
// 	],
// 	theme: {
// 	  extend: {},
// 	},
// 	plugins: [],
//   }