const host = function (_this) {
  // console.log('LIB/HOST', _this.$ssrContext.req.IncomingMessage._readableState)

  // console.log('LIB/HOST', _this.$ssrContext.req)
  const protocol = 'https://'
  return _this.$ssrContext ? protocol + _this.$ssrContext.req.headers.host : protocol + location.host
}

export default host
