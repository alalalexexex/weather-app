const request = require('request');  
const { geocode } = require('./utils/geocode'); 

geocode(process.argv[2], (err, data) => {
    if(err) console.log(err); 
    else{
        const url = "https://api.darksky.net/forecast/94c147c6b8e27f69af6273a051af3156/" + data.longitude +","+ data.latitude;
        request({url: url, json: true}, (error, response, body) => {
            if(error){
                console.log(error); 
            }else if (response.body.error){
                console.log(response.body.error); 
                console.log('Darksky is returning a bad value'); 
            }else{
                console.log('Current weather for...', data.location); 
                console.log(body.daily.data[0].summary); 
                console.log('It is currently' , body.currently.temperature, 'degrees out.', body.currently.precipProbability, '% chance of rain.')
            }
        })
    }
}); 
