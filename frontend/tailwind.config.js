module.exports = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx}', // For the new app directory structure
		'./pages/**/*.{js,ts,jsx,tsx}', // For pages folder, if you're using it
		'./components/**/*.{js,ts,jsx,tsx}', // For any components you might have
	],
	theme: {
		extend: {
			colors: {
				background: '#22223B',
				foreground: '#4A4E69',
				trim: '#9A8C98',
				accent: '#C9ADA7',
				light: '#F2E9E4',
			},
		},
	},
	plugins: [],
};
