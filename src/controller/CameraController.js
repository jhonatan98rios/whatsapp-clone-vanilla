export default class CameraController {

  constructor(videoEl) {

    /* Access the camera API of browser and get a stream as return */

    this._videoEL = videoEl
    navigator.mediaDevices.getUserMedia({
      video: true
    }).then(stream => {

      this._stream = stream // Set scoped stream variable as a privated attribute 
      
      this._videoEL.src = URL.createObjectURL(stream) // Create a URL from streaming video data
      this._videoEl.play()

    }).catch(err => {
      console.log(err)
    })
  }

  stop(){
    /* Stop all tracks of stream (video, audio, etc) */
    this._stream.getTracks().forEach(track => {
      track.stop()
    })
  }

  takePicture(mimeType = 'image/png'){

    let canvas = document.createElement('canvas')
    canvas.setAttribute('height', this._videoEL.videoHeight)
    canvas.setAttribute('width', this._videoEL.videoWidth)

    let context = canvas.getContext('2d')

    context.drawImage(this._videoEL, 0, 0, canvas.width, canvas.height)

    return canvas.toDataURL(mimeType)

  }
}