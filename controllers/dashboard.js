"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/station-store.js");
const uuid = require('uuid');
const accounts = require ('./accounts.js');

const dashboard = {
  index(request, response) {
    logger.info("Rendering dashboard");
    const loggedInUser = accounts.getCurrentUser(request);
    let stations = stationStore.getUserStations(loggedInUser.id, "name")
    for (let station of stations) {
      stationStore.updateLatestReading(station);
      stationStore.updateStationAnalytics(station);
    }
    const viewData = {
       title: `${loggedInUser.firstName}'s Dashboard`,
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
      readings: [],
      latestReading: null,
      analytics: null
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
