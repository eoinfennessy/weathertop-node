"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/station-store.js");
const DetailedReading = require("../models/detailed-reading.js");
const uuid = require('uuid');
const { redirect } = require("express/lib/response");

const dashboard = {
  index(request, response) {
    logger.info("Rendering dashboard");

    let stationCollection = stationStore.getAllStations();

    for (let station of stationCollection) {
      if (station.readings.length) {
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

  addStation(request, response) {
    const newStation = {
      id: uuid.v1(),
      name: request.body.name,
      readings: []
    };
    stationStore.addStation(newStation);
    response.redirect("/dashboard");
  },

  deleteStation(request, response) {
    const stationId = request.params.id;
    logger.debug(`Deleting station ${stationId}`);
    stationStore.removeStation(stationId);
    response.redirect("/dashboard");
  }
};

module.exports = dashboard;
