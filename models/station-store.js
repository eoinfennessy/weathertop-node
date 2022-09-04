'use strict';

const _ = require('lodash');

const stationStore = {
  stationCollection: require('./station-store.json').stationCollection,

  getAllStations() {
    return this.stationCollection;
  },

  getStation(id) {
    return _.find(this.stationCollection, {id: id});
  },

  removeStation(stationId) {
    _.remove(this.stationCollection, {id: stationId});
  },

  removeReading(stationId, readingId) {
    const station = this.getStation(stationId);
    _.remove(station.readings, {id: readingId});
  },
};

module.exports = stationStore;
