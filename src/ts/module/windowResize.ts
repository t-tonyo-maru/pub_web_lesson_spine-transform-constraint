export default () => {
  let timer: number = 0
  let currentWidth = window.innerWidth

  window.onresize = () => {
    if (timer > 0) {
      clearTimeout(timer)
    }

    if (currentWidth === window.innerWidth) {
      return
    }

    timer = window.setTimeout(() => {
      console.log('windowのresize時の処理をここに書く')
    }, 200)
  }
}
