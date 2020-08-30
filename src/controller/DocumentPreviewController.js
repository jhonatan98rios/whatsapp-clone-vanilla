export default class DocumentPreviewController{
    constructor(file){
        this._file = file
    }

    getPreviewData(){
        return new Promise( (s, f) => {
            switch(this._file.type){

                case 'image/png':
                case 'image/jpeg':
                case 'image/jpg':
                case 'image/gif':

                    let reader = new FileReader()

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
                break
                default:
                    f()
            }
        })
    }
}