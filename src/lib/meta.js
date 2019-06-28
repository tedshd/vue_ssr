const meta = function (_this, arg) {
  // console.log('lib/meta', arg)
  if (_this.$ssrContext) {
    ssr()
  } else {
    csr()
  }

  function ssr () {
    _this.$ssrContext.title = arg.title
    _this.$ssrContext.meta = metaToString('meta', arg.meta)
    _this.$ssrContext.link = metaToString('link', arg.link)
  }

  function csr () {
    document.title = arg.title
    metaToTag('meta', arg.meta)
    metaToTag('link', arg.link)
  }

  function metaToString (tag, arg) {
    let str = ''
    for (let i = 0; i < arg.length; i++) {
      let attr = ''
      for (let x in arg[i]) {
        attr = `${attr} ${x}="${arg[i][x]}"`
      }
      str = `${str}<${tag}${attr}>`
    }
    return str
  }

  function metaToTag (tag, arg) {
    for (let i = 0; i < arg.length; i++) {
      let dom = document.createElement(tag)
      for (let x in arg[i]) {
        dom.setAttribute(x, arg[i][x])
      }
      document.querySelector('head').appendChild(dom)
    }
  }
}

export default meta
