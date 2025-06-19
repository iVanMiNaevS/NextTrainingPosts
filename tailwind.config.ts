/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}", // Все файлы в папке `app`
		"./components/**/*.{js,ts,jsx,tsx}", // Компоненты (если есть)
		"./src/**/*.{js,ts,jsx,tsx}", // Если используется папка `src`
	],
	theme: {
		extend: {
			colors: {
				black: "var(--black)",
				purple: "var(--purple)",
				green: "var(--green)",
				white: "var(--white)",
			},
		},
	},
	plugins: [],
};
