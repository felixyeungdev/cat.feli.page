module.exports = {
    purge: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        fontFamily: { display: ["Inter"] },
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [require("@tailwindcss/typography")],
};
