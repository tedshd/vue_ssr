module.exports = {
  css: {
    modules: true,
    loaderOptions: {
      css: {
        options: {
          import: false,
        }
      },
      postcss: {
        plugins: (loader) => [
        require('postcss-import')(),
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
