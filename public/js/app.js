console.log('hello js from app.js');

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const msg1 = document.querySelector('#message-1')
const msg2 = document.querySelector('#message-2')
const msg3 = document.querySelector('#message-3')
const msg4 = document.querySelector('#message-4')
const msg5 = document.querySelector('#message-5')

const img1 = document.querySelector('#img-1')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    msg1.textContent = 'Loading...'
    msg2.textContent = ''
    msg3.textContent = ''
    msg4.textContent = ''
    msg5.textContent = ''

    const location = search.value

    console.log(location)

    fetch('/weather?location='+location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            console.log(data.error)
        } else {
            console.log(data)
            msg1.textContent = data.location
            msg2.textContent = data.forecast
            msg3.textContent = 'Temperature: ' + data.temperature + ' C'
            msg4.textContent = 'Precipitation: ' + data.precip
            msg5.textContent = 'Wind : ' + data.wind
            img1.src = data.icon
        }
      })
    })
})