const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)

const app = express()
const port = process.env.PORT || 3000

const pubDir = path.join(__dirname, '../public')

const viewsPath = path.join(__dirname, '../templates/views')
const partials = path.join(__dirname, '../templates/partials')


// setup handle bars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)

hbs.registerPartials(partials)

// setup status directories to serve
app.use(express.static(pubDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Vinay Kulkarni'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About ME',
        name: 'Vinay Kulkarni'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        phoneNumber: '0404019233',
        name: 'Vinay Kulkarni'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.location) {
        return res.send({
            error: 'You must provide a location'
        })
    }

    geocode(req.query.location, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            console.log('Error: ' + error)
        } else {
            console.log('Data: ' + latitude, longitude, location)

            forecast(location, (error, {temperature, desc, precip, wind, icon}) => {
                if (error) {
                    console.log('Error: ' + error)
                } else {
                    console.log('It is currently ' + desc + ' with temperature of '
                        +  temperature + ' degrees out. There is ' + precip + '% chance of rain.')
                    res.send({
                        forecast: desc,
                        location: req.query.location,
                        temperature: temperature,
                        precip: precip + '%',
                        wind: wind,
                        icon: icon
                    })
                }
            })
        }
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a seach parameter'
        })
    }

    console.log(req.query.rating);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        info: 'Help article not found',
        name: 'Vinay Kulkarni'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found',
        name: 'Vinay Kulkarni'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})