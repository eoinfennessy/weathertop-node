'use strict';

const axios = require("axios");
const uuid = require('uuid');

async function getDailyReadingsGraphData(latitude, longitude, apiKey) {
    let report = { labels: [], temperature: [], windSpeed: [], pressure: [] };
    const requestUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=current,minutely,hourly,alerts&appid=${apiKey}`;
    const response = await axios.get(requestUrl);
    if (response.status == 200) {
        const dailyReadings = response.data.daily;
        for (let reading of dailyReadings) {
            const date = new Date(reading.dt * 1000);
            report.labels.push(`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`);

            report.temperature.push(reading.temp.day);
            report.windSpeed.push(reading.wind_speed);
            report.pressure.push(reading.pressure);
        }
    }
    return report;
}

async function generateReading(latitude, longitude, apiKey) {
    const requestUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=minutely,hourly,daily,alerts&appid=${apiKey}`;
    const response = await axios.get(requestUrl);
    if (response.status == 200) {
        const currentWeather = response.data.current;
        const newReading = {
            id: uuid.v1(),
            code: Number(currentWeather.weather[0].id),
            temperature: Number(currentWeather.temp),
            windSpeed: Number(currentWeather.wind_speed),
            windDirection: Number(currentWeather.wind_deg),
            pressure: Number(currentWeather.pressure),
            date: new Date(currentWeather.dt * 1000)
        }
        return newReading;
    }
    return null;
}

module.exports = {generateReading, getDailyReadingsGraphData}