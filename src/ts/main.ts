// spine
import * as spine from '@esotericsoftware/spine-webgl'
// modules
import { SpineApp } from './modules/spineApp'

window.onload = () => {
  // canvas 要素
  const canvasEl = document.getElementById('canvas') as HTMLCanvasElement
  // #vertical
  const verticalInputRange = document.getElementById('vertical') as HTMLInputElement
  // #horizontal
  const horizontalInputRange = document.getElementById('horizontal') as HTMLInputElement

  // canvas 要素と SpineApp インスタンスを紐付ける
  new spine.SpineCanvas(canvasEl, {
    pathPrefix: 'assets/spine-data/',
    app: new SpineApp({
      verticalInputRange,
      horizontalInputRange
    })
  })
}
