const request = require('request')

const accessKey = '9bee913694554ccfc8cd64514ccdc07f'

const weatherStackUrl = 'http://api.weatherstack.com/current?access_key=' + accessKey + '&query='

const weather = (location, callback) => {
    request({ url: weatherStackUrl + location, json: true}, (error, {body}) => {
        if (error) {
            callback('Error fetching weather data: ' + JSON.stringify(error))
        } else if (body.error) {
            callback('some error: ' + JSON.stringify(body.error))
        } else {
            console.log(body)
            const resBody = body.current
            callback(undefined, {
                temperature: resBody.temperature,
                desc: resBody.weather_descriptions[0],
                precip: resBody.precip,
                wind: resBody.wind_speed + ' kmph ' + resBody.wind_dir,
                icon: resBody.weather_icons[0]
            })
        }
    })
}

module.exports = weather