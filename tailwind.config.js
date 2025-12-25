/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            animation: {
                'twinkle': 'twinkle 2s infinite ease-in-out',
                'rainbow': 'rainbow 3s infinite linear',
                'float': 'float 3s infinite ease-in-out',
            },
            keyframes: {
                twinkle: {
                    '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
                    '50%': { opacity: '1', transform: 'scale(1.2)', boxShadow: '0 0 10px currentColor' },
                },
                rainbow: {
                    '0%': { fill: '#ef4444', boxShadow: '0 0 5px #ef4444' },
                    '20%': { fill: '#eab308', boxShadow: '0 0 5px #eab308' },
                    '40%': { fill: '#22c55e', boxShadow: '0 0 5px #22c55e' },
                    '60%': { fill: '#3b82f6', boxShadow: '0 0 5px #3b82f6' },
                    '80%': { fill: '#a855f7', boxShadow: '0 0 5px #a855f7' },
                    '100%': { fill: '#ef4444', boxShadow: '0 0 5px #ef4444' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                }
            }
        },
    },
    plugins: [],
}
