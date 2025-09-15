/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
	  "./app/**/*.{js,ts,jsx,tsx,mdx}",
	  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
	  "./components/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
	    extend: {
			colors: {
			  primary: '#013362',
			  secondary: '#C9974C',
			  third: "#009BD2",
			  green: {
				200: '#46EE37',
			  },
			  white: '#fff',
			  black: '#000',
			  gray: {
				100: '#EEEDED',
				200: '#CACACA',
				300: '#797979',
				400: '#AEAEAE',
				500: '#F7F7F7',
			  },
			  blue: {
				100: '#24ABE3',
			  },
			  border: '#666666',
			},
			fontFamily: {
			  outfit: ['Outfit', 'sans-serif'],
			  poppins: ['Poppins', 'sans-serif'],
			},
			screens: {
			  sm: '360px',
			  md: '540px',
			  lg: '768px',
			  xl: '1024px',
			  '2xl': '1280px',
			  '3xl': '1440px',
			  '4xl': '1600px',
			  '5xl': '1920px',
			},
		  },
	},
	plugins: [],
  }
  