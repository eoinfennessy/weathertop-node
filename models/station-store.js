'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');
const DetailedReading = require("./detailed-reading.js");
const StationAnalytics = require("./station-analytics.js");

const stationStore = {
  store: new JsonStore('./models/station-store.json', { stationCollection: [] }),
  collection: 'stationCollection',

  getAllStations() {
    return this.store.findAll(this.collection);
  },

  getStation(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  getUserStations(userid, sortedByAttribute="") {
    const stations = this.store.findBy(this.collection, { userid: userid });
    if (sortedByAttribute === "name") {
      stations.sort((a, b) => a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1);
    }
    return stations;
  },

  addStation(station) {
    this.store.add(this.collection, station);
    this.store.save();
  },

  removeStation(id) {
    const station = this.getStation(id);
    this.store.remove(this.collection, station);
    this.store.save();
  },

  removeUserStations(userid) {
    const stations = this.getAllStations();
    _.remove(stations, function(station) {
      return station.userid === userid;
    });
    this.store.save();
  },

  removeAllStations() {
    this.store.removeAll(this.collection);
    this.store.save();
  },

  addReading(id, reading) {
    const station = this.getStation(id);
    station.readings.push(reading);
    this.store.save();
  },

  removeReading(stationId, readingId) {
    const station = this.getStation(stationId);
    const readings = station.readings;
    _.remove(readings, {id: readingId});
    this.store.save();
  },

  updateLatestReading(station) {
    if (station.readings.length) {
      station.latestReading = new DetailedReading(station.readings[station.readings.length - 1]);
    } else {
      station.latestReading = null;
    }
    this.store.save();
  },

  updateStationAnalytics(station) {
    if (station.readings.length) {
      station.analytics = new StationAnalytics(station);
    } else {
      station.analytics = null;
    }
    this.store.save();
  },

  convertDateStringsToDateObjects(readings) {

  }
};

module.exports = stationStore;
