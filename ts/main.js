"use strict";
// 2.-Conseguimos latitud y longitud
if (navigator.geolocation) {
    var success = function (position) {
        const latitud = position.coords.latitude, longitud = position.coords.longitude;
        const newLatitud = latitud.toString();
        const newLongitud = longitud.toString();
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
        return newJoke;
    });
}
// puntuamos el chiste
const reportAcudits = [];
function getPoints(id) {
    var _a;
    const nota = id;
    const currentDate = new Date();
    const textDate = currentDate.toISOString();
    const lastJoke = (_a = document.getElementById('getAjoke')) === null || _a === void 0 ? void 0 : _a.outerText;
    const textLastJoke = lastJoke;
    const jokeFound = reportAcudits.find((e) => textLastJoke === e.joke);
    const acudit = {
        joke: textLastJoke,
        score: nota,
        date: textDate
    };
    if (lastJoke !== '' && !jokeFound) {
        reportAcudits.push(acudit);
        console.log(reportAcudits);
    }
}
