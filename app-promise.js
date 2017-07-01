const yargs = require('yargs');
const axios = require('axios');

const getDate = require('./getDate');

const API_KEY = '85e892b68014ea8021339baff1360e7f';
const DF = '˚F';
const ECONNREFUSED= 'ECONNREFUSED';
const ZERO_RESULTS= 'ZERO_RESULTS';
const mph = 'MPH';


const argv = yargs
.options({
    a: {
        demand: true,
        alias: 'address',
        describe: 'Address to fetch weather for',
        string: true,
        default: 'Manhattan, New York' //Default value is set to Manhattan, New York.
    }

})
.help() //help commands
.alias('help', 'h')
.argv; //takes all the configurations and runs through arguments to save in the argv variable

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl).then((response) => {
    if(response.data.status === ZERO_RESULTS){
        throw new Error('Unable to find that address.');
    }

    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var location = response.data.results[0].formatted_address;
    console.log(`The weather in ${location} on`);

    var weatherUrl = `https://api.darksky.net/forecast/${API_KEY}/${lat},${lng}`;
    return axios.get(weatherUrl);
}).then((response) =>{
   //console.log(JSON.stringify(response.data, undefined, 2));
   //All the data from the response object is contained in that^.
   
   var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    var windSpeed = response.data.currently.windSpeed;
    var temperatureMax = response.data.daily.data[0].temperatureMax;
    var temperatureMin = response.data.daily.data[0].temperatureMin;
    var uvIndex = response.data.currently.uvIndex;
    var currentConditions = response.data.minutely.summary;

    //The time
    console.log(`${getDate.getDate(response.data.currently.time)} is as follows: \n`);

    //Forecast as of now
    console.log(`Current conditions say: ${currentConditions} \n`);

    //The forecast
    console.log(`The High for today is ${temperatureMax}${DF} and the Low is  ${temperatureMin}${DF}. \n`);
    console.log(`It is  currently ${temperature}${DF}, but it feels like ${apparentTemperature}${DF}. \n`);
    console.log(`Additionally, the wind speed is  ${windSpeed} ${mph} with a UV index of ${uvIndex}.\n`);
}).catch((e) => {
    if ( e.code === ECONNREFUSED){
        console.log('Unable to connect to API servers.');
    } else {
        console.log(e.message);
    }
    console.log(error);
});

