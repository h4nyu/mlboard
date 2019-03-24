module.exports = {
  presets: [
    "@vue/app"
  ],
  plugins: [
    [
      "module-resolver", {
        alias: {
          "@": "./src"
        },
      }
    ]
  ],
}
