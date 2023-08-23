let img;
let img_status = false
async function search_city(l_data) {

    let search_input = document.getElementById('searchtext').value
    if (l_data) {
        search_input = l_data
    }
    if (search_input.length > 0) {
        // call api
        try {
            let res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=05ae538d5ea94c9989183803232102&q=${search_input}&days=4&aqi=no&alerts=no`);
            let json = await res.json()
            if (json) {
                set_Data(json)
            }
        } catch (error) {
            swal('Error','Enter Valid City Name !','error');
            console.log(error)
        }



    } else {
        swal('Error','Enter City Name !','error');
    }
}


function set_Data(json) {
    let city_name = document.getElementById('city_name')
    let country_name = document.getElementById('country_name')
    let temp = document.getElementById('temp')
    let currentDate = document.getElementById('currentDate');
    let currentTime = document.getElementById('currentTime');
    let last_updated = document.getElementById('last_updated')
    let status = document.getElementById('status')
    let humidity = document.getElementById('humidity')
    let wind_speed = document.getElementById('wind_speed')

    if (img_status == false) {
        img = document.createElement('img');
    }
    if (img) {
        img_status = true
    }
    img.src = json.current.condition.icon;
    document.getElementById('weather-status-img').appendChild(img);
    city_name.innerText = json.location.name;
    country_name.innerHTML = json.location.country
    temp.innerText = json.current.temp_c + '℃'
    currentDate.innerText = json.location.localtime.slice(0, 10)
    currentTime.innerHTML = json.location.localtime.slice(10, 16)
    status.innerText = json.current.condition.text
    last_updated.innerText = 'Last Updated At ' + json.current.last_updated
    humidity.innerText = 'humidity :' + json.current.humidity
    wind_speed.innerText = 'Wind speed :' + json.current.wind_kph + '/kph'
}



function getLocation() {



    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(success, fail);

    } 
}


function success(position) {
    let latitude = position.coords.latitude
    let longitude = position.coords.longitude
    if (latitude) {
        let format = `${latitude},${longitude}`


        search_city(format)
    }
}

function fail() {
    swal('Not Supported','cant get your current location ','error')
}