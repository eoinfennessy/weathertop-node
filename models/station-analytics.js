"use strict";

class StationAnalytics {
    constructor(station, trendLen=3) {
        this.maxTemp = Math.max(...station.readings.map(reading => reading.temperature));
        this.minTemp = Math.min(...station.readings.map(reading => reading.temperature));
        this.maxWindSpeed = Math.max(...station.readings.map(reading => reading.windSpeed));
        this.minWindSpeed = Math.min(...station.readings.map(reading => reading.windSpeed));
        this.maxPressure = Math.max(...station.readings.map(reading => reading.pressure));
        this.minPressure = Math.min(...station.readings.map(reading => reading.pressure));

        this.tempTrend = this.calculateTrend(station.readings.map(reading => reading.temperature), trendLen);
        this.windSpeedTrend = this.calculateTrend(station.readings.map(reading => reading.windSpeed), trendLen);
        this.pressureTrend = this.calculateTrend(station.readings.map(reading => reading.pressure), trendLen);
    }

    calculateTrend(array, trendLen) {
        if (array.length >= trendLen) {
            let subArray = array.slice(trendLen * -1);
            if (this.isUpwardTrend(subArray)) {
                return "up arrow";
            } else if (this.isDownwardTrend(subArray)) {
                return "down arrow";
            }
        }
        return ""
    }

    isUpwardTrend(array) {
        let prev = array[0];
        for (let i = 1; i < array.length; i++) {
            if (array[i] <= prev) {
                return false;
            } else {
                prev = array[i];
            }
        }
        return true;
    }

    isDownwardTrend(array) {
        let prev = array[0];
        for (let i = 1; i < array.length; i++) {
            if (array[i] >= prev) {
                return false;
            } else {
                prev = array[i];
            }
        }
        return true;
    }
}

module.exports = StationAnalytics;
