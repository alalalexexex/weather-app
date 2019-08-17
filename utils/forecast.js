const request = require('request'); 

module.exports = {
    forecast(latitude, longitude, callback){
        const url = "https://api.darksky.net/forecast/94c147c6b8e27f69af6273a051af3156/" + latitude +","+ longitude;
        request({ url: url, json: true}, (error, response, body) => {
            if(error){
                callback('Unable to connect to Darksky', null); 
            }else if(body.error){
                callback('Darksky not working', null); 
            }else{
                callback(null, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. ' + body.currently.precipProbability + '% chance of rain.')
            }
        })
    }
}