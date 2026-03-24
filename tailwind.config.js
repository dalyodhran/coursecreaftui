/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: '2rem',
  			md: '1.5rem',
  			sm: '1rem',
			DEFAULT: '1rem',
			xl: '3rem',
			full: '9999px'
  		},
  		colors: {
  			background: '#f9f9f9',
  			foreground: '#1a1c1c',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: '#005ab4',
  				foreground: '#ffffff'
  			},
  			secondary: {
  				DEFAULT: '#465f89',
  				foreground: '#ffffff'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: '#ba1a1a',
  				foreground: '#ffffff'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
			"on-tertiary-fixed": "#321200",
			"outline": "#717785",
			"surface-container-lowest": "#ffffff",
			"tertiary": "#964400",
			"surface-tint": "#005db8",
			"surface-container": "#eeeeee",
			"surface": "#f9f9f9",
			"on-tertiary": "#ffffff",
			"on-error-container": "#93000a",
			"error-container": "#ffdad6",
			"surface-bright": "#f9f9f9",
			"on-primary-container": "#fefcff",
			"inverse-primary": "#aac7ff",
			"surface-container-high": "#e8e8e8",
			"on-primary": "#ffffff",
			"tertiary-fixed": "#ffdbc9",
			"on-primary-fixed-variant": "#00458d",
			"surface-container-highest": "#e2e2e2",
			"error": "#ba1a1a",
			"on-secondary-fixed": "#001b3e",
			"surface-container-low": "#f3f3f4",
			"tertiary-container": "#bd5700",
			"on-error": "#ffffff",
			"on-surface-variant": "#414753",
			"on-secondary-container": "#405882",
			"on-background": "#1a1c1c",
			"inverse-surface": "#2f3131",
			"outline-variant": "#c1c6d5",
			"primary-fixed-dim": "#aac7ff",
			"on-primary-fixed": "#001b3e",
			"secondary-fixed": "#d6e3ff",
			"primary-container": "#0873df",
			"inverse-on-surface": "#f0f1f1",
			"secondary-container": "#b7cfff",
			"on-tertiary-fixed-variant": "#763400",
			"surface-variant": "#e2e2e2",
			"on-secondary-fixed-variant": "#2e4770",
			"on-secondary": "#ffffff",
			"on-surface": "#1a1c1c",
			"on-tertiary-container": "#fffbff",
			"tertiary-fixed-dim": "#ffb68c",
			"surface-dim": "#dadada",
			"primary-fixed": "#d6e3ff",
			"secondary-fixed-dim": "#afc7f7"
  		},
		fontFamily: {
			headline: ["Lexend", "sans-serif"],
			body: ["Lexend", "sans-serif"],
			label: ["Lexend", "sans-serif"],
			sans: ["Lexend", "sans-serif"]
		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}

