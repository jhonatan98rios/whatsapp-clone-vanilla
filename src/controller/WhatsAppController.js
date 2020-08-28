class WhatsAppController {

  constructor() {
    console.log("WhatsAppController Ok")

    this.elementsPrototype()
    this.loadElements()
    this.initEvents()
  }

  loadElements() {

    this.el = {}

    document.querySelectorAll('[id]').forEach(element => {
      this.el[Format.getCamelCase(element.id)] = element;
    })
  }

  elementsPrototype() {
    Element.prototype.hide = function () {
      this.style.display = 'none'
      return this
    }

    Element.prototype.show = function () {
      this.style.display = 'block'
      return this
    }

    Element.prototype.toggle = function () {
      this.style.display = (this.style.display === 'none') ? 'block' : 'none'
      return this
    }

    Element.prototype.on = function (events, fn) {
      events.split(' ').forEach(event => {
        this.addEventListener(event, fn)
      })
      return this
    }

    Element.prototype.css = function (styles) {
      for (let name in styles) {
        this.style[name] = styles[name]
      }
      return this
    }

    Element.prototype.addClass = function (name) {
      this.classList.add(name)
      return this
    }

    Element.prototype.removeClass = function (name) {
      this.classList.remove(name)
      return this
    }

    Element.prototype.toggleClass = function (name) {
      this.classList.toggle(name)
      return this
    }

    Element.prototype.hasClass = function (name) {
      return this.classList.contains(name)
    }

    HTMLFormElement.prototype.getForm = function () {
      return new FormData(this)
    }

    HTMLFormElement.prototype.toJSON = function () {
      let json = {}
      this.getForm().forEach((value, key) => {
        json[key] = value
      })
      return json
    }
  }

  initEvents() {
    this.el.myPhoto.on('click', e => {
      this.closeAllLeftPanel()
      this.el.panelEditProfile.show()
      setTimeout(() => {
        this.el.panelEditProfile.addClass('open')
      }, 300)
    })

    this.el.btnNewContact.on('click', e => {
      this.closeAllLeftPanel()
      this.el.panelAddContact.show()
      setTimeout(() => {
        this.el.panelAddContact.addClass('open')
      }, 300)
    })

    this.el.btnClosePanelEditProfile.on('click', e => {
      this.el.panelEditProfile.removeClass('open')
    })

    this.el.btnClosePanelAddContact.on('click', e => {
      this.el.panelAddContact.removeClass('open')
    })

    this.el.photoContainerEditProfile.on('click', e => {
      this.el.inputProfilePhoto.click()
    })

    this.el.inputNamePanelEditProfile.on('keypress', e => {
      if (e.key === "Enter") {
        e.preventDefault()
        this.el.btnSavePanelEditProfile.click()

      }
    })

    this.el.btnSavePanelEditProfile.on('click', e => {
      console.log(this.el.inputNamePanelEditProfile.innerHTML)
    })

    this.el.formPanelAddContact.on('submit', e => {
      e.preventDefault()
      let formData = new FormData(this.el.formPanelAddContact)
    })

    this.el.contactsMessagesList.querySelectorAll('.contact-item').forEach(item => {
      item.on('click', e => {
        this.el.home.hide()
        this.el.main.css({
          display: 'flex'
        })
      })
    })

    /* Anexed options */

    this.el.btnAttach.on('click', e => {
      e.stopPropagation()
      this.el.menuAttach.addClass('open')
      document.addEventListener('click', this.closeMenuAttach.bind(this))
    })

    this.el.btnAttachPhoto.on('click', e => {
      this.el.inputPhoto.click()
    })

    this.el.inputPhoto.on('change', e => {
      console.log(this.el.inputPhoto.files);
      [...this.el.inputPhoto.files].forEach(file => {
        console.log(file)
      })
    })

    this.el.btnAttachCamera.on('click', e => {
      this.closeAllMainPanel()
      this.el.panelCamera.addClass('open')
      this.el.panelCamera.css({
        'height': 'calc(100% - 120px)'
      })

      this._camera = new CameraController(this.el.videoCamera);

    })

    this.el.btnClosePanelCamera.on('click', e => {
      this.closeAllMainPanel()
      this.el.panelMessagesContainer.show()
    })

    this.el.btnTakePicture.on('click', e => {
      console.log('take picture')
    })

    this.el.btnAttachDocument.on('click', e => {
      this.closeAllMainPanel()
      this.el.panelDocumentPreview.addClass('open')
      this.el.panelDocumentPreview.css({
        'height': 'calc(100% - 120px)'
      })
    })

    this.el.btnClosePanelDocumentPreview.on('click', e => {
      this.closeAllMainPanel()
      this.el.panelMessagesContainer.show()
    })

    this.el.btnSendDocument.on('click', e => {
      console.log('Send Document')
    })

    this.el.btnAttachContact.on('click', e => {
      this.el.modalContacts.show()
    })

    this.el.btnCloseModalContacts.on('click', e => {
      this.el.modalContacts.hide()
    })

    /* Input options */

    this.el.btnSendMicrophone.on('click', e => {
      this.el.recordMicrophone.show()
      this.el.btnSendMicrophone.hide()
      this.startRecordMicrophoneTime()
    })

    this.el.btnCancelMicrophone.on('click', e => {
      this.closeRecordMicrophone()
    })

    this.el.btnFinishMicrophone.on('click', e => {
      this.closeRecordMicrophone()
    })

    this.el.inputText.on('keypress', e => {
      if (e.key === 'Enter' && !e.crtlKey) {
        e.preventDefault()
        this.el.btnSend.click()
      }
    })

    this.el.inputText.on('keyup', e => {
      if (this.el.inputText.innerHTML.length) {
        this.el.inputPlaceholder.hide()
        this.el.btnSendMicrophone.hide()
        this.el.btnSend.show()
      } else {
        this.el.inputPlaceholder.show()
        this.el.btnSendMicrophone.show()
        this.el.btnSend.hide()
      }
    })

    this.el.btnSend.on('click', e => {
      console.log(this.el.inputText.innerHTML)
    })

    this.el.btnEmojis.on('click', e => {
      this.el.panelEmojis.toggleClass('open')
    })

    this.el.panelEmojis.querySelectorAll('.emojik').forEach(emoji => {

      emoji.on('click', e => {

        let img = this.el.imgEmojiDefault.cloneNode()
        img.style.cssText = emoji.style.cssText
        img.dataset.unicode = emoji.dataset.unicode
        img.alt = emoji.alt

        emoji.classList.forEach(name => {
          img.classList.add(name)
        })

        //this.el.inputText.appendChild(img)

        let cursor = window.getSelection() // Get the keyboeard cursor in input textt

        if (!cursor.focusNode || !cursor.focusNode.id == 'input-text') {
          this.el.inputText.focus()
          cursor = window.getSelection()
        }

        let range = document.createRange(); // Create a range of selectioned text 

        range = cursor.getRangeAt(0) // Get the first position of range
        range.deleteContents() // Delete the selectioned text

        // Create a insertion in a text
        let frag = document.createDocumentFragment()
        frag.appendChild(img)
        range.insertNode(frag)

        range.setStartAfter(img) //Move the cursor, to after a emoji


        this.el.inputText.dispatchEvent(new Event('keyup'))
      })
    })




  }

  startRecordMicrophoneTime() {
    let start = Date.now()

    this._recordMicrophoneInterval = setInterval(() => {
      this.el.recordMicrophoneTimer.innerHTML = Format.toTime(Date.now() - start)
    }, 100)
  }

  closeRecordMicrophone() {
    this.el.recordMicrophone.hide()
    this.el.btnSendMicrophone.show()

    clearInterval(this._recordMicrophoneInterval)
  }

  closeAllMainPanel() {
    this.el.panelMessagesContainer.hide()
    this.el.panelDocumentPreview.removeClass('open')
    this.el.panelCamera.removeClass('open')
  }

  closeMenuAttach(e) {
    document.removeEventListener('click', this.closeMenuAttach)
    this.el.menuAttach.removeClass('open')
  }

  closeAllLeftPanel() {
    this.el.panelEditProfile.hide()
    this.el.panelAddContact.hide()
  }
}