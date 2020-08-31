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

                    reader.onload = e => {

                        pdfjsLib.getDocument(new Uint8Array(reader.result)).then(pdf => {

                            console.log('pdf', pdf)

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