module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      spacing: {
        '128': '32rem',
        '156': '48rem',
        '256': '60rem',
        '500': '80rem',
      },
      height: {
        '0.1': '0.05rem'
      },
      animation: {
        'ping': 'ping 0.02s ease-in-out',
      },
    },
  },
  plugins: [],
}
