const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const DF = 'Degrees Farenheit';


const argv = yargs
.options({
    a: {
        demand: true,
        alias: 'address',
        describe: 'Address to fetch weather for',
        string: true
    }

})
.help() //help commands
.alias('help', 'h')
.argv; //takes all the configurations and runs through arguments to save in the argv variable

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if (errorMessage){
        console.log(errorMessage);
    } else {
        weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
        if (errorMessage){
        console.log(errorMessage);
    } else {
        console.log(`It is currently: ${weatherResults.temperature} ${DF}, but it feels like: ${weatherResults.apparentTemperature} ${DF} in ${results.address}.`);
    }
});
    }

});


