module.exports = {
    purge: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: false,
    mode: "jit",
    theme: {
        fontFamily: { display: ["Inter"] },
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
