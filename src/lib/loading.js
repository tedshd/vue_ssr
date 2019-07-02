const loading = function (state, style) {
  if (state) {
    document.body.classList.add(style.loading_body)
    document.querySelector('#loading_view').classList.add(style.loading)
  } else {
    document.body.classList.remove(style.loading_body)
    document.querySelector('#loading_view').classList.remove(style.loading)
  }
}

export default loading
