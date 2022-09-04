"use strict";

const logger = require("../utils/logger");
const stationCollection = require("../models/station-store.js");
const DetailedReading = require("../models/detailed-reading.js");

const dashboard = {
  index(request, response) {
    logger.info("Rendering dashboard");

    for (let station of stationCollection) {
      station.latestReading = new DetailedReading(station.readings[0]);
    }

    const viewData = {
       title: 'WeatherTop Dashboard',
       stations: stationCollection
    };
    response.render("dashboard", viewData);
  }
};

module.exports = dashboard;
