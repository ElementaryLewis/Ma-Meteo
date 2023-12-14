import { getResponse, getAstro } from "./api.js"
import getPosition from "./localisation.js"
import { backgroundUpdate } from "./background.js"
import { hideOverlay } from "./popup.js"

//recupération des éléments html par id pour l'écran principal
let weatherIconBig = document.getElementById("weatherIconBig")
let currentPosition = document.getElementById("currentPosition")
let inputAgrandi = document.getElementById("inputAgrandi")
let bouton2 = document.getElementById("boutonGO")
let starToggle = document.getElementById("star_toggle")
let ville = document.getElementById("ville_localisation")
let weather_today = document.getElementById("weather_today")
let temperature = document.getElementById("temperature")
let wet = document.getElementById("wet_today")
let wind = document.getElementById("wind_today")
let aqi = document.getElementById("aqi_today")
let uv = document.getElementById("uv_today")
let sunrise = document.getElementById("soleil_leve")
let sunset = document.getElementById("soleil_couche")
let map = document.getElementById("map")
let btnFavoris = document.getElementById("btnPopupFavoris")

// Récupération des éléments HTML par id pour la partie "prévisions du jour"
let weatherIconLittleMorning = document.getElementById("weatherIconLittleMorning")
let weather_morning = document.getElementById("weather_morning")
let temperatureMorning = document.getElementById("temperature_short_morning")

let weatherIconLittleAfternoon = document.getElementById("weatherIconLittleAfternoon")
let weather_afternoon = document.getElementById("weather_afternoon")
let temperatureAfternoon = document.getElementById("temperature_short_afternoon")

let weatherIconLittleEvening = document.getElementById("weatherIconLittleEvening")
let weather_evening = document.getElementById("weather_evening")
let temperatureEvening = document.getElementById("temperature_short_evening")

let weatherIconLittleNight = document.getElementById("weatherIconLittleNight")
let weather_night = document.getElementById("weather_night")
let temperatureNight = document.getElementById("temperature_short_night")

// Récupération des éléments HTML par id pour la partie "prévisions du lendemain"
let weatherIconLittleMorningTomorrow = document.getElementById("weatherIconLittleMorningTomorrow")
let weather_morning_demain = document.getElementById("weather_morning_demain")
let temperature_short_demain_morning = document.getElementById("temperature_short_demain_morning")

let weatherIconLittleAfternoonTomorrow = document.getElementById("weatherIconLittleAfternoonTomorrow")
let weather_afternoon_demain = document.getElementById("weather_afternoon_demain")
let temperature_short_demain_afternoon = document.getElementById("temperature_short_demain_afternoon")

let weatherIconLittleEveningTomorrow = document.getElementById("weatherIconLittleEveningTomorrow")
let weather_everning_demain = document.getElementById("weather_everning_demain")
let temperature_short_demain_evening = document.getElementById("temperature_short_demain_evening")

let weatherIconLittleNightTomorrow = document.getElementById("weatherIconLittleNightTomorrow")
let weather_night_demain = document.getElementById("weather_night_demain")
let temperature_short_demain_night = document.getElementById("temperature_short_demain_night")

//Fonction d'attribution des données API
async function attributionDonnesAPI(value) {

    let resultatRetour = await getResponse(value);
    let astro = await getAstro(value)
    console.log(resultatRetour)
    weatherIconBig.src = resultatRetour.current.condition.icon
    weatherIconBig.alt = resultatRetour.current.condition.text
    ville.textContent = `${resultatRetour.location.name}, ${resultatRetour.location.country}`
    weather_today.textContent = resultatRetour.current.condition.text
    temperature.textContent = `${resultatRetour.current.temp_c}° Celsius`
    wet.textContent = `Humidité: ${resultatRetour.current.humidity}%`
    wind.textContent = `Vent: ${resultatRetour.current.wind_kph}Km/h`

    let currentAqi = resultatRetour.current.air_quality["us-epa-index"]
    //console.log(currentAqi)
    switch (currentAqi) {

        case 1:
            aqi.textContent = "AQI: Bonne"
            aqi.classList.add("aqi1")
            break;
        case 2:
            aqi.textContent = "AQI: Modérée"
            aqi.classList.add("aqi2")
            break;
        case 3:
            aqi.textContent = "AQI: Dégradée"
            aqi.classList.add("aqi3")
            break;
        case 4:
            aqi.textContent = "AQI: Nocive"
            aqi.classList.add("aqi4")
            break;
        case 5:
            aqi.textContent = "AQI: Trés Nocive"
            aqi.classList.add("aqi5")
            break;
        case 6:
            aqi.textContent = "AQI: Dangereuse"
            aqi.classList.add("aqi6")
            break;
    }

    uv.textContent = `UV: ${resultatRetour.current.uv}`
    sunrise.textContent = `${astro.astronomy.astro.sunrise}`
    sunset.textContent = `${astro.astronomy.astro.sunset}`

    // Attribution des valeurs tirées de l'API pour les prévisions du jour
    weatherIconLittleMorning.src = resultatRetour.forecast.forecastday[0].hour[6].condition.icon
    weatherIconLittleMorning.alt = resultatRetour.forecast.forecastday[0].hour[6].condition.text
    weather_morning.textContent = resultatRetour.forecast.forecastday[0].hour[6].condition.text
    temperatureMorning.textContent = resultatRetour.forecast.forecastday[0].hour[6].temp_c

    weatherIconLittleAfternoon.src = resultatRetour.forecast.forecastday[0].hour[11].condition.icon
    weatherIconLittleAfternoon.alt = resultatRetour.forecast.forecastday[0].hour[11].condition.text
    weather_afternoon.textContent = resultatRetour.forecast.forecastday[0].hour[11].condition.text
    temperatureAfternoon.textContent = resultatRetour.forecast.forecastday[0].hour[11].temp_c

    weatherIconLittleEvening.src = resultatRetour.forecast.forecastday[0].hour[16].condition.icon
    weatherIconLittleEvening.alt = resultatRetour.forecast.forecastday[0].hour[16].condition.text
    weather_evening.textContent = resultatRetour.forecast.forecastday[0].hour[16].condition.text
    temperatureEvening.textContent = resultatRetour.forecast.forecastday[0].hour[16].temp_c

    weatherIconLittleNight.src = resultatRetour.forecast.forecastday[0].hour[23].condition.icon
    weatherIconLittleNight.alt = resultatRetour.forecast.forecastday[0].hour[23].condition.text
    weather_night.textContent = resultatRetour.forecast.forecastday[0].hour[23].condition.text
    temperatureNight.textContent = resultatRetour.forecast.forecastday[0].hour[23].temp_c

    // Attribution des valeurs tirées de l'API pour les prévisions du lendemain
    weatherIconLittleMorningTomorrow.src = resultatRetour.forecast.forecastday[1].hour[6].condition.icon
    weatherIconLittleMorningTomorrow.alt = resultatRetour.forecast.forecastday[1].hour[6].condition.text
    weather_morning_demain.textContent = resultatRetour.forecast.forecastday[1].hour[6].condition.text
    temperature_short_demain_morning.textContent = resultatRetour.forecast.forecastday[1].hour[6].temp_c

    weatherIconLittleAfternoonTomorrow.src = resultatRetour.forecast.forecastday[1].hour[11].condition.icon
    weatherIconLittleAfternoonTomorrow.alt = resultatRetour.forecast.forecastday[1].hour[11].condition.text
    weather_afternoon_demain.textContent = resultatRetour.forecast.forecastday[1].hour[11].condition.text
    temperature_short_demain_afternoon.textContent = resultatRetour.forecast.forecastday[1].hour[11].temp_c

    weatherIconLittleEveningTomorrow.src = resultatRetour.forecast.forecastday[1].hour[16].condition.icon
    weatherIconLittleEveningTomorrow.alt = resultatRetour.forecast.forecastday[1].hour[16].condition.text
    weather_everning_demain.textContent = resultatRetour.forecast.forecastday[1].hour[16].condition.text
    temperature_short_demain_evening.textContent = resultatRetour.forecast.forecastday[1].hour[16].temp_c

    weatherIconLittleNightTomorrow.src = resultatRetour.forecast.forecastday[1].hour[23].condition.icon
    weatherIconLittleNightTomorrow.alt = resultatRetour.forecast.forecastday[1].hour[23].condition.text
    weather_night_demain.textContent = resultatRetour.forecast.forecastday[1].hour[23].condition.text
    temperature_short_demain_night.textContent = resultatRetour.forecast.forecastday[1].hour[23].temp_c

    //Création de la carte

    //Réinitialisation de la carte pour un nouvel affichage 
    map = L.DomUtil.get('map');
    if (map != null) {
        map._leaflet_id = null;
    }

    // Génération de la nouvelle carte
    map = L.map('map', {
        center: [resultatRetour.location.lat, resultatRetour.location.lon],
        zoom: 5
    });

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([resultatRetour.location.lat, resultatRetour.location.lon]).addTo(map)
        .bindPopup('Vous êtes ici')

    backgroundUpdate(resultatRetour);
}

// Fonction de récupération de la localisation de l'utilisateur
async function usePos() {
    try {
        const pos = await getPosition();
        console.log(pos);
        const latitude = pos.coords.latitude
        const longitude = pos.coords.longitude;
        //console.log(longitude, latitude);
        const userLocation = `${latitude},${longitude}`

        // Appel de l'API avec les donnes de géolocalisation
        const response = await getResponse(userLocation)
        const astro = await getAstro(userLocation)
        console.log(response, astro)

        //Attirubution des valeurs aux différents éléments de la page
        currentPosition.textContent = `Vous êtes à : ${response.location.name},${response.location.country}`
        weatherIconBig.src = response.current.condition.icon
        ville.textContent = `${response.location.name},${response.location.country}`
        temperature.textContent = `${response.current.temp_c}° Celsius`
        wet.textContent = `Humidité: ${response.current.humidity}%`
        wind.textContent = `Vent: ${response.current.wind_kph}Km/h`

        let currentAqi = response.current.air_quality["us-epa-index"]
        switch (currentAqi) {

            case 1:
                aqi.textContent = "AQI: Bonne"
                aqi.classList.add("aqi1")
                break;
            case 2:
                aqi.textContent = "AQI: Modérée"
                aqi.classList.add("aqi2")
                break;
            case 3:
                aqi.textContent = "AQI: Dégradée"
                aqi.classList.add("aqi3")
                break;
            case 4:
                aqi.textContent = "AQI: Nocive"
                aqi.classList.add("aqi4")
                break;
            case 5:
                aqi.textContent = "AQI: Trés Nocive"
                aqi.classList.add("aqi5")
                break;
            case 6:
                aqi.textContent = "AQI: Dangereuse"
                aqi.classList.add("aqi6")
                break;
        }

        uv.textContent = `UV: ${response.current.uv}`
        sunrise.textContent = `${astro.astronomy.astro.sunrise}`
        sunset.textContent = `${astro.astronomy.astro.sunset}`

        // Attribution des valeurs tirées de l'API pour les prévisions du jour
        weatherIconLittleMorning.src = response.forecast.forecastday[0].hour[6].condition.icon
        weather_morning.textContent = response.forecast.forecastday[0].hour[6].condition.text
        temperatureMorning.textContent = response.forecast.forecastday[0].hour[6].temp_c

        weatherIconLittleAfternoon.src = response.forecast.forecastday[0].hour[11].condition.icon
        weather_afternoon.textContent = response.forecast.forecastday[0].hour[11].condition.text
        temperatureAfternoon.textContent = response.forecast.forecastday[0].hour[11].temp_c

        weatherIconLittleEvening.src = response.forecast.forecastday[0].hour[16].condition.icon
        weather_evening.textContent = response.forecast.forecastday[0].hour[16].condition.text
        temperatureEvening.textContent = response.forecast.forecastday[0].hour[16].temp_c

        weatherIconLittleNight.src = response.forecast.forecastday[0].hour[23].condition.icon
        weather_night.textContent = response.forecast.forecastday[0].hour[23].condition.text
        temperatureNight.textContent = response.forecast.forecastday[0].hour[23].temp_c

        // Attribution des valeurs tirées de l'API pour les prévisions du lendemain
        weatherIconLittleMorningTomorrow.src = response.forecast.forecastday[1].hour[6].condition.icon
        weather_morning_demain.textContent = response.forecast.forecastday[1].hour[6].condition.text
        temperature_short_demain_morning.textContent = response.forecast.forecastday[1].hour[6].temp_c

        weatherIconLittleAfternoonTomorrow.src = response.forecast.forecastday[1].hour[11].condition.icon
        weather_afternoon_demain.textContent = response.forecast.forecastday[1].hour[11].condition.text
        temperature_short_demain_afternoon.textContent = response.forecast.forecastday[1].hour[11].temp_c

        weatherIconLittleEveningTomorrow.src = response.forecast.forecastday[1].hour[16].condition.icon
        weather_everning_demain.textContent = response.forecast.forecastday[1].hour[16].condition.text
        temperature_short_demain_evening.textContent = response.forecast.forecastday[1].hour[16].temp_c

        weatherIconLittleNightTomorrow.src = response.forecast.forecastday[1].hour[23].condition.icon
        weather_night_demain.textContent = response.forecast.forecastday[1].hour[23].condition.text
        temperature_short_demain_night.textContent = response.forecast.forecastday[1].hour[23].temp_c

        //Création de la carte
        let map = L.map('map').setView([latitude, longitude], 13);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([latitude, longitude]).addTo(map)
            .bindPopup('Vous êtes ici')

    } catch (error) {
        console.error(error);
    }
    backgroundUpdate(response);
}

//Gestion des favoris

let btnPopupFavoris = document.getElementById("btnPopupFavoris")
let overlayFavoris = document.getElementById("overlayFavoris")
let popup_container = document.getElementById("popup_container")
let fermerFavoris = document.getElementById("fermerFavoris")

btnPopupFavoris.addEventListener("click",()=>{
    overlayFavoris.style.display = "block";
    popup_container.style.visibility = "hidden";
})
    
fermerFavoris.addEventListener("click",()=>{
    overlayFavoris.style.display = "none"
    popup_container.style.visibility = "visible"   
})

let divFavoris = document.createElement("div")
divFavoris.classList.add("popupFavoris")

btnFavoris.addEventListener("click", () => {
    overlayFavoris.appendChild(divFavoris)
})

//Tableau de stockage des favoris
let tableaufav = []

//Ecouteur d'événement : Ajout du lieu en cours dans le tableau tableauFav
starToggle.addEventListener("click", () => {

    console.log(`Etat de tableauFav : ${tableaufav}`)

    //Changement de l'icône, push du nom de la ville dans le tableau
    starToggle.src = "../img/star_filled.png"
    tableaufav.push(ville.textContent)
    console.log(tableaufav)

    //Création d'une div pour accueillir le nom de la ville
    let divFav = document.createElement("div")
    divFav.classList.add("divFav")
    divFav.textContent = ville.textContent
    divFavoris.appendChild(divFav)

    //Création d'un balise img pour accueillir l'image du bouton supprimer
    let removeBtn = document.createElement("img")
    removeBtn.src = "../img/bouton-supprimer.png"
    divFav.appendChild(removeBtn)

    //Ecouteur d'événements pour supprimer la div parente a clic sur le bouton supprimer
    removeBtn.addEventListener("click", () => {

        //Boucle sur tableau des villes stockées pour trouver la ville correspondante a la div et la supprimer à l'aide de la méthode splice
        for (let i = 0; i < tableaufav.length; i++) {
            console.log(tableaufav[i])
            if (tableaufav[i] === divFav.textContent) {
                tableaufav.splice([i], 1)
                console.log(tableaufav)
            }
        }

        //Méthode de suppréssion du parent du bouton pour retirer tout la div du popup des favoris
        removeBtn.parentElement.remove()
    })

    //Ecouteur d'événements pour déclencher une recherche sur la ville correspodnante au clic sur la ville correspondante
    divFav.addEventListener("click", async () => {
        await attributionDonnesAPI(divFav.textContent)
    })
})

//Appel de la fonction usepos
usePos();

//recuperation de la reponse
bouton2.addEventListener("click", () => {
    attributionDonnesAPI(inputAgrandi.value)
    hideOverlay();
})



