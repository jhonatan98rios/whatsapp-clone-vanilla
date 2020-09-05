const pdfjsLib = require('pdfjs-dist')
const path = require('path')

pdfjsLib.GlobalWorkerOptions.workerSrc = path.resolve(__dirname, '../../dist/pdf.worker.bundle.js')

export default class DocumentPreviewController{
    constructor(file){
        this._file = file
    }

    getPreviewData(){
        return new Promise( (s, f) => {

            let reader = new FileReader();

            switch(this._file.type){

                case 'image/png':
                case 'image/jpeg':
                case 'image/jpg':
                case 'image/gif':

                    reader.onload = e => {
                        s({
                            src: reader.result,
                            info: this._file.name
                        })
                    }
                    reader.onerror = e => {
                        f(e);
                    }

                    reader.readAsDataURL(this._file)
                break;

                case 'application/pdf':

                    reader.onload = async e => {

                        // This function is not working, I need fix this

                        let pdf = await pdfjsLib.getDocument(new Uint8Array(reader.result)).promise
                        
                        pdf.getPage(1).then( page  => {

                            let viewport = {
                                height: 540,
                                offsetX: 0,
                                offsetY: 0,
                                rotation: 0,
                                scale: 1,
                                transform: [1, 0, 0, -1, 0, 540],
                                viewBox: [0,0,960,540],
                                width: 960
                            }

                            console.log(page)

                            //let viewport = page.getViewPort({ scale: 1 })
                            let canvas = document.createElement('canvas')
                            let canvasContext = canvas.getContext('2d')

                            canvas.width = viewport.width
                            canvas.height = viewport.height

                            page.render({
                                canvasContext,
                                viewport 
                            })

                            let _s = pdf.numPages > 1 ? 's' : ''

                            s({
                                src: canvas.toDataURL('image/png'),
                                info: `${pdf.numPages} página${_s}`
                            })

                        }).catch( err => {
                            f(err)
                        })

                    }

                    reader.readAsArrayBuffer(this._file)


                break
                default:
                    f()
            }
        })
    }
}