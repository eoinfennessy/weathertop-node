"use strict";

const express = require("express");
const router = express.Router();

const dashboard = require("./controllers/dashboard.js");
const about = require("./controllers/about.js");
const station = require('./controllers/station.js');

router.get("/", dashboard.index);
router.get("/about", about.index);

router.get("/dashboard", dashboard.index);
router.post("/dashboard/add-station", dashboard.addStation);
router.get('/delete-station/:id', dashboard.deleteStation);

router.get('/station/:id', station.index);
router.get('/station/:stationId/delete-reading/:readingId', station.deleteReading);
router.post('/station/:id/add-reading', station.addReading);

module.exports = router;
