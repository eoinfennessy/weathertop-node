"use strict";

class DailyReadings {
    constructor(latitude, longitude, apiKey) {
        requestUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&units=metric&exclude=current,minutely,hourly,alerts&appid=${apiKey}`;
    }
}

module.exports = DetailedReading;