'use strict';

const logger = require('../utils/logger');
const stationStore = require('../models/station-store.js');
const DetailedReading = require("../models/detailed-reading.js");
const StationAnalytics = require("../models/station-analytics.js");
const uuid = require('uuid');

const station = {
  index(request, response) {
    const stationId = request.params.id;
    logger.debug(`Station ID: ${stationId}`);
    const station = stationStore.getStation(stationId);
    if (station.readings.length) {
      station.readings.forEach(reading => {reading.date = new Date(reading.date)});
      station.latestReading = new DetailedReading(station.readings[station.readings.length - 1]);
      station.analytics = new StationAnalytics(station);
    } else {
      station.latestReading = null;
    }
    const viewData = {
      station: station
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

  deleteReading(request, response) {
    const stationId = request.params.stationId;
    const readingId = request.params.readingId;
    logger.debug(`Deleting reading ${readingId} from station ${stationId}`);
    stationStore.removeReading(stationId, readingId);
    response.redirect(`/station/${stationId}`);
  }
};

module.exports = station;
