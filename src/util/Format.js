export default class Format {

  static getCamelCase(text) {

    // This class convert dash-case to camelCase

    let div = document.createElement('div') //Create a fake div
    div.innerHTML = `<div data-${text}="id"></div>` //Add the text inside of div
    return Object.keys(div.firstChild.dataset)[0] //Return the key of the first child of div
  }

  static toTime(duration) {

    let seconds = parseInt((duration / 1000) % 60)
    let minutes = parseInt((duration / (1000 * 60)) % 60)
    let hours = parseInt((duration / (1000 * 60 * 60)) % 24)

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    } else {
      return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }
  }

  static dateToTime(date, locale = 'pt-BR'){
    return date.toLocaleTimeString(locale, {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  static timeStampToTime(timeStamp){
    return (timeStamp && typeof timeStamp.toDate === 'function') 
      ? Format.dateToTime(timeStamp.toDate()) 
      : ''
  }

}