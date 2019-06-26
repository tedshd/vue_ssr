module.exports = {
  css: {
    modules: true,
    loaderOptions: {
      postcss: {
        plugins: (loader) => [
          require('postcss-apply')(),
          require('postcss-css-variables')()
        ]
      }
    }
  },
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  }
}
