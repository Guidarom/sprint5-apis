"use strict";
// 2.-Conseguimos latitud y longitud
if (navigator.geolocation) {
    var success = function (position) {
        var latitud = position.coords.latitude, longitud = position.coords.longitude;
        var newLatitud = latitud.toString();
        var newLongitud = longitud.toString();
        // 3.- hacemos otro fetch para traer el estado del clima por la ubicación mediante latitud y longitud
        const apiWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${newLatitud}&lon=${newLongitud}&appid=26e4714b232ad047024b8f3db887092f&lang=ca`;
        console.log(apiWeather);
        fetch(apiWeather)
            .then((response) => response.json())
            .then((data) => {
            const newWeather = data.weather;
            const weatherDescription = (newWeather[0]).description;
            console.log(newWeather);
            document.getElementById('getWeather').innerHTML = weatherDescription;
        });
    };
    //console.log(parametros)
    navigator.geolocation.getCurrentPosition(success, function (msg) {
        console.error(msg);
    });
}
//1.- Obtenemos el chiste
function getJoke() {
    const apiJoke = 'https://icanhazdadjoke.com';
    const header = { headers: { Accept: "application/json" } };
    fetch(apiJoke, header)
        .then((response) => response.json())
        .then((data) => {
        const newJoke = data.joke;
        document.getElementById('getAjoke').innerHTML = newJoke;
    });
}
