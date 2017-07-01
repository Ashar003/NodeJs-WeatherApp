const request = require('request');
const API_KEY = '85e892b68014ea8021339baff1360e7f';

var getWeather = (lat,lng,callback) => {

request({
     url: `https://api.darksky.net/forecast/${API_KEY}/${lat},${lng}`,
    json: true
}, (error, response, body) => {
    if(error){
        callback('Unable to connect to Forecast.io server.');
    }
    if (!error && response.statusCode === 200){
        callback(undefined, {
            temperature: body.currently.temperature,
            apparentTemperature: body.currently.apparentTemperature
        });
    } else {
        callback('Unable to fetch weather.');
    }
       

});
};

module.exports = {
    getWeather
}