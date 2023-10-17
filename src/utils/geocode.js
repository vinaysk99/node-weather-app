const request = require('request')

const mapBoxToken = 'pk.eyJ1IjoidmluYXlzazk5IiwiYSI6ImNsbThsNXhsMjBhbTUzZWxwaGVuOW0xdmMifQ.X2IHnozq-MZEEp8tmtYn-Q'

const geocode = (address, callback) => {
    const geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' 
        + address + '.json?access_token=' + mapBoxToken + '&limit=1'

    request({ url: geocodeUrl, json: true}, (error, response) => {
        if (error) {
            callback('unable to connect to location services', undefined)
        } else if (response.body.features.length === 0) {
            callback('invalid location, try again with correct location', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode