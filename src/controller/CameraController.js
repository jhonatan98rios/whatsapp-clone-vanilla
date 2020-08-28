class CameraController {

  constructor(videoEl) {

    this._videoEL = videoEl
    navigator.mediaDevices.getUserMedia({
      video: true
    }).then(stream => {
      this._videoEL.src = URL.createObjectURL(stream) // Create a URL from streaming video data
      this._videoEl.play()
    }).catch(err => {
      console.log(err)
    })
  }
}