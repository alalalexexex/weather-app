const request = require('request'); 

// make a function to parse a city name --> 

const parseCityName = (name) => {
    const result = name.replace(/\s/g, "%20"); 
    return result; 
}; 

if(!process.argv[2]){
    console.log('Must be a valid city name wrapped in double quotes!'); 
    return; 
}

const geocodeURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+parseCityName(process.argv[2])+".json?access_token=pk.eyJ1IjoiYWxhbGFsZXhleGV4IiwiYSI6ImNqemJyZGhoczAxd3ozbXBtdWxta2VicG0ifQ.kT2duIVB4ab7GtxEHPQl1w&limit=1"; 

new Promise((resolve, reject) => {
    request({ url: geocodeURL, json: true }, (err, response) => {
        if(err) reject(err); 
        else if(response.body.features.length < 1) reject('Response from mapbox failed.'); 
        else resolve(response.body.features[0].center); 
    });
}).then((value) => {

    const url = "https://api.darksky.net/forecast/94c147c6b8e27f69af6273a051af3156/" + String(value[1]) +","+ String(value[0]); 
    
    request({uri: url, json: true}, (err, response) => {
        if(err) {
            console.log('No internet connection.');
        }else if(response.body.error){
            console.log('Connection to DarkSky failed. Maybe check coordinates?'); 
        }else{
            const currently = response.body.currently; 
            console.log(response.body.daily.data[0].summary); 
            console.log('It is currently', currently.temperature, 'degrees out. There is a', currently.precipProbability + ' %', 'chance of rain'); 
        }
    }); 
}).catch((value) => console.log(value)); 