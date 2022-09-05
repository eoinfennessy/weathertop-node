'use strict';

const logger = require('../utils/logger');
const stationStore = require('../models/station-store.js');
const req = require('express/lib/request');
const uuid = require('uuid');

const station = {
  index(request, response) {
    const stationId = request.params.id;
    logger.debug(`Station ID: ${stationId}`);
    const viewData = {
      station: stationStore.getStation(stationId)
    };
    response.render('station', viewData);
  },

  addReading(request, response) {
    const stationId = request.params.id;
    const newReading = {
      id: uuid.v1(),
      code: request.body.code,
      temperature: request.body.temperature,
      windSpeed: request.body.windSpeed,
      windDirection: request.body.windDirection,
      pressure: request.body.pressure
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
