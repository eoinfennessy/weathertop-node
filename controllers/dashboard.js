"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/station-store.js");
const DetailedReading = require("../models/detailed-reading.js");

const dashboard = {
  index(request, response) {
    logger.info("Rendering dashboard");

    let stationCollection = stationStore.getAllStations();

    for (let station of stationCollection) {
      if (station.length) {
        station.latestReading = new DetailedReading(station.readings[0]);
      } else {
        station.latestReading = null;
      }
    }

    const viewData = {
       title: 'WeatherTop Dashboard',
       stations: stationCollection
    };
    response.render("dashboard", viewData);
  },

  deleteStation(request, response) {
    const stationId = request.params.id;
    logger.debug(`Deleting station ${stationId}`);
    stationStore.removeStation(stationId);
    response.redirect("/dashboard");
  }
};

module.exports = dashboard;
