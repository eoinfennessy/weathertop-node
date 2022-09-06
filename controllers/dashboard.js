"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/station-store.js");
const DetailedReading = require("../models/detailed-reading.js");
const StationAnalytics = require("../models/station-analytics.js");
const uuid = require('uuid');
const accounts = require ('./accounts.js');

const dashboard = {
  index(request, response) {
    logger.info("Rendering dashboard");

    const loggedInUser = accounts.getCurrentUser(request);
    let stations = stationStore.getUserStations(loggedInUser.id)
    stations.sort((a, b) => a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1);

    for (let station of stations) {
      if (station.readings.length) {
        station.readings.forEach(reading => {reading.date = new Date(reading.date)});
        station.latestReading = new DetailedReading(station.readings[station.readings.length - 1]);
        station.analytics = new StationAnalytics(station);
      } else {
        station.latestReading = null;
      }
    }
    const viewData = {
       title: 'WeatherTop Dashboard',
       stations: stations
    };
    response.render("dashboard", viewData);
  },

  addStation(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newStation = {
      id: uuid.v1(),
      userid: loggedInUser.id,
      name: request.body.name,
      latitude: Number(request.body.latitude),
      longitude: Number(request.body.longitude),
      readings: []
    };
    logger.debug('Creating station: ', newStation);
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
