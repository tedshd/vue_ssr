const metaInfo = function (_this, arg) {
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
      str = `${str}<${tag} class="render_${tag}"${attr}>`
    }
    return str
  }

  // TODO handle it append
  function metaToTag (tag, arg) {
    let domOld = document.querySelectorAll('.render_' + tag)
    // delete current meta
    for (var i = 0; i < domOld.length; i++) {
        domOld[i].outerHTML = '';
    }
    domOld = null
    for (let i = 0; i < arg.length; i++) {
      let dom = document.createElement(tag)
      for (let x in arg[i]) {
        dom.setAttribute(x, arg[i][x])
        dom.classList.add('render_' + tag)
      }
      document.querySelector('head').appendChild(dom)
    }
  }
}

export default metaInfo
