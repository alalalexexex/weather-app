const request = require('request');  
const { geocode } = require('./utils/geocode'); 
const { forecast } = require('./utils/forecast')

geocode(process.argv[2], (err, data) => {
    if(err) console.log(err); 
    else {
        console.log(data.location); 
        forecast(data.latitude, data.longitude, (error, data) => {
            console.log(error); 
            console.log(data); 
        })
    }
}); 
