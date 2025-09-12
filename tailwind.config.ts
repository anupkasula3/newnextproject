import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				heading: ['Poppins', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				purple: {
					DEFAULT: '#8B5CF6',
					50: '#F3EFFE',
					100: '#E6DFFC',
					200: '#D1C3FA',
					300: '#BCA7F7',
					400: '#A68BF4',
					500: '#8B5CF6',
					600: '#7046E3',
					700: '#5A2FD6',
					800: '#4320B9',
					900: '#2C1678',
				},
				cyan: {
					DEFAULT: '#06B6D4',
					50: '#E0F7FC',
					100: '#B8EEFA',
					200: '#87E2F7',
					300: '#56D5F4',
					400: '#25C9F1',
					500: '#06B6D4',
					600: '#0092AA',
					700: '#006D80',
					800: '#004955',
					900: '#00242B',
				},
				pink: {
					DEFAULT: '#EC4899',
					50: '#FDEEF5',
					100: '#FBDCEB',
					200: '#F8B9D7',
					300: '#F495C3',
					400: '#F172AF',
					500: '#EC4899',
					600: '#DE1F83',
					700: '#B5196A',
					800: '#8B1251',
					900: '#620C39',
				},
				magenta: {
					DEFAULT: '#D946EF',
					50: '#FAE8FD',
					100: '#F5D0FB',
					200: '#EBA5F7',
					300: '#E17AF3',
					400: '#D74FEF',
					500: '#D946EF',
					600: '#C422DD',
					700: '#9E1CB3',
					800: '#77158A',
					900: '#510F60',
				},
				orange: {
					DEFAULT: '#F97316',
					50: '#FEF2E7',
					100: '#FDE5CF',
					200: '#FBCB9F',
					300: '#FAB16F',
					400: '#F8973F',
					500: '#F97316',
					600: '#D95C06',
					700: '#A74605',
					800: '#763103',
					900: '#441C02',
				},
				indigo: {
					DEFAULT: '#6366F1',
					50: '#EDEEFE',
					100: '#DBDCFD',
					200: '#B7BAF9',
					300: '#9497F6',
					400: '#7075F3',
					500: '#6366F1',
					600: '#444BDC',
					700: '#2D34BE',
					800: '#1F2487',
					900: '#11164F',
				},
				teal: {
					DEFAULT: '#14B8A6',
					50: '#E6F7F5',
					100: '#CDEFE9',
					200: '#9BE0D7',
					300: '#68D0C5',
					400: '#36C1B2',
					500: '#14B8A6',
					600: '#109384',
					700: '#0C6E63',
					800: '#084941',
					900: '#042520',
				},
				coral: {
					DEFAULT: '#F87171',
					50: '#FEF2F2',
					100: '#FEE2E2',
					200: '#FBC5C5',
					300: '#F9A8A8',
					400: '#F87171',
					500: '#F54C4C',
					600: '#F21F1F',
					700: '#CD0C0C',
					800: '#9A0909',
					900: '#680606',
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-out': {
					'0%': { opacity: '1', transform: 'translateY(0)' },
					'100%': { opacity: '0', transform: 'translateY(10px)' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'scale-out': {
					from: { transform: 'scale(1)', opacity: '1' },
					to: { transform: 'scale(0.95)', opacity: '0' }
				},
				'slide-in': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(0)' }
				},
				'slide-out': {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(-100%)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'pulse-slow': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'fade-out': 'fade-out 0.5s ease-out',
				'scale-in': 'scale-in 0.3s ease-out',
				'scale-out': 'scale-out 0.3s ease-out',
				'slide-in': 'slide-in 0.5s ease-out',
				'slide-out': 'slide-out 0.5s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'pulse-slow': 'pulse-slow 4s ease-in-out infinite'
			},
			boxShadow: {
				'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
				'neobrutal': '5px 5px 0px rgba(0, 0, 0, 0.8)'
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
