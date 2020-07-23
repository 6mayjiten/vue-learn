const plugins = [];
if (process.env.VUE_APP_STAGE === 'development') {
  plugins.push('transform-remove-console')
}
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
  ],
  plugins: plugins
}
