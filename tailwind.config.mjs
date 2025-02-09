/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ["var(--font-ubuntu)", "sans-serif"], // Ubuntu as the main font
			},
			colors: {
				background: {
					DEFAULT: 'hsl(var(--background, 240, 100%, 5%))', // Dark Blue fallback
				},
				foreground: 'hsl(var(--foreground, 240, 100%, 95%))',
				card: {
					DEFAULT: 'hsl(var(--card, 250, 96%, 21%))',
					foreground: 'hsl(var(--card-foreground, 240, 100%, 80%))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover, 248, 97%, 33%))',
					foreground: 'hsl(var(--popover-foreground, 0, 0%, 100%))',
				},
				primary: {
					DEFAULT: 'hsl(var(--primary, 251, 96%, 49%))', // #3805F2
					foreground: 'hsl(var(--primary-foreground, 0, 0%, 100%))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary, 248, 97%, 33%))', // #2703A6
					foreground: 'hsl(var(--secondary-foreground, 0, 0%, 100%))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted, 250, 96%, 21%))', // #150259
					foreground: 'hsl(var(--muted-foreground, 240, 100%, 80%))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent, 209, 85%, 67%))', // #63A1F2
					foreground: 'hsl(var(--accent-foreground, 0, 0%, 20%))',
				},
				highlight: {
					DEFAULT: 'hsl(var(--highlight, 99, 86%, 65%))', // #84F266
					foreground: 'hsl(var(--highlight-foreground, 0, 0%, 10%))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive, 0, 85%, 60%))',
					foreground: 'hsl(var(--destructive-foreground, 0, 0%, 100%))',
				},
				border: "hsl(var(--border, 248, 15%, 50%))",
				input: 'hsl(var(--input, 248, 97%, 33%))',
				ring: 'hsl(var(--ring, 209, 85%, 67%))',
				chart: {
					'1': 'hsl(var(--chart-1, 251, 96%, 49%))',
					'2': 'hsl(var(--chart-2, 248, 97%, 33%))',
					'3': 'hsl(var(--chart-3, 250, 96%, 21%))',
					'4': 'hsl(var(--chart-4, 209, 85%, 67%))',
					'5': 'hsl(var(--chart-5, 99, 86%, 65%))',
				}
			},
			borderRadius: {
				lg: 'var(--radius, 12px)',
				md: 'calc(var(--radius, 12px) - 2px)',
				sm: 'calc(var(--radius, 12px) - 4px)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
};
