const firebase = require('firebase')
require('firebase/firestore')

export default class Firebase {
    constructor(){

        this._config = {
            apiKey: "AIzaSyBvxy5bwB6DMe289pHn77eYonlpjmwabac",
            authDomain: "whatsapp-clone-vanilla-js.firebaseapp.com",
            databaseURL: "https://whatsapp-clone-vanilla-js.firebaseio.com",
            projectId: "whatsapp-clone-vanilla-js",
            storageBucket: "whatsapp-clone-vanilla-js.appspot.com",
            messagingSenderId: "1070866144923",
            appId: "1:1070866144923:web:2d8bbd2bab42997367303e"
        };

        this.init()
    }

    init(){

        if (!window._initializedFirebase){

            // Initialize Firebase
            firebase.initializeApp(this._config);

            firebase.firestore().settings({
                //timestampsInSnapshots: true
            })

            window._initializedFirebase = true
        }

    }

    static db(){
        return firebase.firestore()
    }

    static hd(){
        return firebase.storage()
    }

    initAuth(){
        return new Promise((s, f) => {

            let provider = new firebase.auth.GoogleAuthProvider()

            firebase.auth().signInWithPopup(provider)
                .then(result => {
                    let token = result.credential.accessToken
                    let user = result.user
                    s({ user, token })
                })
                .catch(err => {
                    f(err) 
                })
        })
    }
}