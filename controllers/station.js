'use strict';

const logger = require('../utils/logger');
const stationStore = require('../models/station-store.js');
const openWeatherMapUtils = require("../utils/open-weather-map-utils.js");
const uuid = require('uuid');

const station = {
  async index(request, response) {
    const station = stationStore.getStation(request.params.id);
    stationStore.updateLatestReading(station);
    stationStore.updateStationAnalytics(station);
    station.readings.forEach(reading => {reading.date = new Date(reading.date)});
    const dailyReadings = await openWeatherMapUtils.getDailyReadingsGraphData(station.latitude,
                                                                              station.longitude,
                                                                              process.env.OPEN_WEATHER_API_KEY);
    const viewData = {
      station: station,
      dailyReadings: dailyReadings
    };
    response.render('station', viewData);
  },

  addReading(request, response) {
    const stationId = request.params.id;
    const newReading = {
      id: uuid.v1(),
      code: Number(request.body.code),
      temperature: Number(request.body.temperature),
      windSpeed: Number(request.body.windSpeed),
      windDirection: Number(request.body.windDirection),
      pressure: Number(request.body.pressure),
      date: new Date()
    };
    stationStore.addReading(stationId, newReading);
    response.redirect('/station/' + stationId);
  },

  async generateReading(request, response) {
    const stationId = request.params.id;
    const station = stationStore.getStation(stationId);
    const newReading = await openWeatherMapUtils.generateReading(station.latitude,
                                                                 station.longitude,
                                                                 process.env.OPEN_WEATHER_API_KEY);
    stationStore.addReading(stationId, newReading);
    response.redirect('/station/' + stationId);
  },

  deleteReading(request, response) {
    const stationId = request.params.stationId;
    const readingId = request.params.readingId;
    logger.debug(`Deleting reading ${readingId} from station ${stationId}`);
    stationStore.removeReading(stationId, readingId);
    response.redirect(`/station/${stationId}`);
  }
};

module.exports = station;
