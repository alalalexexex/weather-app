const { geocode } = require('./utils/geocode'); 
const { forecast } = require('./utils/forecast')

if(!process.argv[2]){
    console.log('Please provide an address.'); 
    return; 
}

geocode(process.argv[2], (err, {latitude, longitude, location}) => {
    if(err) return console.log(err);  

    forecast(latitude, longitude, (error, weatherData) => {
        if(error) return console.log(error);  
        console.log(location); 
        console.log(weatherData); 
    })
}); 
