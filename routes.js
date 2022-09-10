"use strict";

const express = require("express");
const router = express.Router();

const dashboard = require("./controllers/dashboard.js");
const about = require("./controllers/about.js");
const station = require('./controllers/station.js');
const accounts = require('./controllers/accounts.js');

router.get("/", accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.get('/account-settings', accounts.settings);
router.post('/account-settings/update-name', accounts.updateName);
router.post('/account-settings/update-email', accounts.updateEmail);
router.post('/account-settings/delete-account', accounts.deleteAccount);
router.post('/account-settings/update-password', accounts.updatePassword);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

router.get("/about", about.index);

router.get("/dashboard", dashboard.index);
router.get('/delete-station/:id', dashboard.deleteStation);
router.post("/dashboard/add-station", dashboard.addStation);

router.get('/station/:id', station.index);
router.get('/station/:stationId/delete-reading/:readingId', station.deleteReading);
router.post('/station/:id/add-reading', station.addReading);
router.post('/station/:id/generate-reading', station.generateReading);

module.exports = router;
