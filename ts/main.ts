
 // 2.-Conseguimos latitud y longitud
if (navigator.geolocation){
    var success= function(position:any){
        
        const latitud = position.coords.latitude,
            longitud = position.coords.longitude;
        const newLatitud: String = latitud.toString();
        const newLongitud: String = longitud.toString();

// 3.- hacemos otro fetch para traer el estado del clima por la ubicación mediante latitud y longitud
        const apiWeather= `https://api.openweathermap.org/data/2.5/weather?lat=${newLatitud}&lon=${newLongitud}&appid=26e4714b232ad047024b8f3db887092f&lang=ca&units=metric`;
            console.log(apiWeather);
        fetch(apiWeather)
            .then((response) => response.json())
            .then((data) => {
                const newWeather= data.weather;
                const tempCent = data.main.temp;
                console.log(data)
                console.log(data.main.temp);
                const icon = (newWeather[0]).icon
                console.log(icon)
                const iconWeather = <HTMLImageElement>document.getElementById('iconWeather')
                iconWeather.src = `./img/icons-temp/${icon}.png`
                const weatherDescription = (newWeather[0]).description
                console.log(newWeather)
                document.getElementById('getWeather')!.innerHTML=` ${tempCent}\u00B0`
            });
            
            
    }
    //console.log(parametros)
    navigator.geolocation.getCurrentPosition(success, function(msg){
        console.error(msg);
    })
    
}
//1.- Obtenemos el chiste
const reportAcudits:Acudit[]=[];
let arrayCounter:number=0
function getJoke(){
    const lastJoke:any = document.getElementById('getAjoke')?.outerText;
    const textLastJoke:String = lastJoke
    const jokeFound = reportAcudits.find((e)=>textLastJoke ===e.joke);
    if(jokeFound|| arrayCounter===0){

        if(arrayCounter%2===0){
            const apiNorris = 'https://api.chucknorris.io/jokes/random';
            fetch(apiNorris)
            .then((response) => response.json())
            .then((data) => {
            const norrisJoke = data.value;
            document.getElementById('getAjoke')!.innerHTML = norrisJoke;
            return norrisJoke;   
        });
        }
        else{
            const apiJoke = 'https://icanhazdadjoke.com';
            const header = {headers: {Accept: "application/json" }};
            fetch(apiJoke,header)
            .then((response) => response.json())
            .then((data) => {
            const newJoke= data.joke
            document.getElementById('getAjoke')!.innerHTML=newJoke
            return newJoke
        }); 
        }
    changeBackground()
    arrayCounter++
    }
    else{
        alert("valora l'acudit per veure el següent")
    }
};
// puntuamos el chiste
interface Acudit{
    joke: String;
    score: Number;
    date: String;
}

function getPoints(id:number){

    const nota: number=id
    const currentDate = new Date();
    const textDate = currentDate.toISOString();
    const lastJoke:any = document.getElementById('getAjoke')?.outerText;
    const textLastJoke:String = lastJoke
    const jokeFound = reportAcudits.find((e)=>textLastJoke ===e.joke);
    
    const acudit: Acudit = {
        joke: textLastJoke,
        score: nota,
        date: textDate
        
    } 
    if(textLastJoke!==''&& !jokeFound){
    reportAcudits.push(acudit)
    console.log(reportAcudits)
    }
};
// ---------------------- CHANGE IMG BG ---------------------- 

const bgImg: NodeListOf<HTMLOrSVGImageElement> = document.querySelectorAll('.bgImg')

function changeBackground(): void {
    
    bgImg.forEach((img: HTMLOrSVGImageElement) => {
        
        const randomNumber = Math.round(Math.random() * 10)
        const srcRoute = `../img/blobs/blob${randomNumber}.svg`
        img.style.backgroundImage = `url(${srcRoute})`
    });

}
