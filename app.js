const express = require('express');
const app = express();
const https = require('https');
const bodyParser = require('body-parser');
const port = 3000;

const {Config} = require('./config.js');

var key = Config.myAPIKey;

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
    res.sendFile(__dirname + "/index.html")
});

app.post("/", function(req, res){
    const query = req.body.cityName;
    const apiKey = key;
    const unit = "metric";

    url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${unit}`;
    
    
    https.get(url, function(response){
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const imageIcon = weatherData.weather[0].icon
            imageURL = `http://openweathermap.org/img/wn/${imageIcon}@2x.png`

            res.write(`<h1>The temperature for ${weatherData.name} right now is ${weatherData.main.temp} degrees Celsius.</h1>`);
            res.write(`<h2>Also, the weather condition for ${weatherData.name} is ${weatherData.weather[0].description}.</h2>`);
            res.write(`<image src="${imageURL}" alt="weather-image">`)
            res.send();

        });
    })
});

app.listen(port, function(){
    console.log(`Server bhai ne bola port ${port} pe sunneka to sunneka!!!`);
});

