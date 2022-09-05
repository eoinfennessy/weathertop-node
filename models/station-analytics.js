"use strict";

class StationAnalytics {
    constructor(station) {
        this.maxTemp = Math.max(...station.readings.map(reading => reading.temperature));
        this.minTemp = Math.min(...station.readings.map(reading => reading.temperature));
        this.maxWindSpeed = Math.max(...station.readings.map(reading => reading.windSpeed));
        this.minWindSpeed = Math.min(...station.readings.map(reading => reading.windSpeed));
        this.maxPressure = Math.max(...station.readings.map(reading => reading.pressure));
        this.minPressure = Math.min(...station.readings.map(reading => reading.pressure));
    }
}

module.exports = StationAnalytics;
