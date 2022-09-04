"use strict";

const conversions = require('../utils/conversions');

class DetailedReading {
    constructor(reading) {
        this.tempInFahrenheit = conversions.celsiusToFahrenheit(reading.temperature);
        this.weatherCondition = conversions.weatherCodeToCondition[reading.code];
        this.beaufortForce = conversions.windSpeedToBeaufort(reading.windSpeed);
    }
}

module.exports = DetailedReading;
