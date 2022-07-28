//select the elmnts
const NotifElement = document.querySelector('.notifaction');
const IconElement = document.querySelector(' .icon');
const TempElement = document.querySelector('.temp p');
const DescrElement = document.querySelector('.description p');
const LocationElement = document.querySelector('.location p');

// APP CONSTS AND VARS
const KELVIN = 273;
// API KEY
const key = "82005d27a116c2880c8f0fcb866998a0";

//create the object weather
const weather = {
    temperature : {
        value : "",
        unit : "celsuis"
    },
    description : "" ,
    iconId : "",
    city : "",
    country : ""

}

//check the geolocation availbity
if ("geolocation" in navigator){
    navigator.geolocation.getCurrentPosition(setPosition,showError);
}
else{
    NotifElement.innerHTML = `<p>Browser doesn't support geolocation </p>`

}

//get data from the api and display it 
function getWeather(latitude,longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

    fetch(api)
        .then((response)=>{
            let data = response.json();
            console.log(data);
            return data;
            

        })
        .then((data)=>{
            weather.temperature.value =  Math.floor(data.main.temp)-KELVIN;
            weather.country = data.sys.country;
            weather.city = data.name;
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
         
        })

        .then(()=>{
            displayWeather()
        })
       
    }


//GET LOCATION  (call back function for getCurrentPosition )
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    getWeather(latitude,longitude);

    
}

//in case there's an eror  (call back function for getCurrentPosition ) *optional
function showError(error){
    NotifElement.innerHTML = `<p> ${error.message} </p>`
}

//display data in the page
function displayWeather(){
    IconElement.innerHTML = `<img src="icons/${weather.iconId}.png" alt="">`;
    TempElement.innerHTML = `${weather.temperature.value} °<span>C</span>`;
    DescrElement.innerHTML = weather.description;
    LocationElement.innerHTML = `${weather.city} , ${weather.country}  `

}

//change the unit
function celsuisToFahrenheit(temp){
    return (temp * 9/5 )+32 ;
}


// Change the unit with a click
TempElement.addEventListener('click',()=>{
    if(weather.temperature.unit === 'undefined'){
        return
    }


    if(weather.temperature.unit === 'celsius'){
        let fahrenheit = celsuisToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);

        TempElement.innerHTML = `${fahrenheit} °<span>F</span>`;
        weather.temperature.unit = 'fahrenheit';

    }
    else{
        TempElement.innerHTML = `${weather.temperature.value} °<span>C</span>`;
        weather.temperature.unit = 'celsius';


    }
})