console.log('hello js from app.js');

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const msgOne = document.querySelector('#message-1')

const msgTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    msgOne.textContent = 'Loading...'
    msgTwo.textContent = ''

    const location = search.value

    console.log(location)

    fetch('/weather?location='+location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            console.log(data.error)
        } else {
            console.log(data)
            msgOne.textContent = data.location
            msgTwo.textContent = data.forecast
        }
      })
    })
})