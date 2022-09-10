'use strict';

const userStore = require('../models/user-store');
const stationStore = require('../models/station-store');
const logger = require('../utils/logger');
const uuid = require('uuid');

const accounts = {
  index(request, response) {
    let isUserLoggedIn = Boolean(request.cookies.weathertop);
    const viewData = {
      title: 'Welcome to WeatherTop',
      isUserLoggedIn: isUserLoggedIn
    };
    response.render('index', viewData);
  },

  login(request, response) {
    const viewData = {
      title: 'Login to WeatherTop',
    };
    response.render('login', viewData);
  },

  logout(request, response) {
    response.cookie('weathertop', '');
    response.redirect('/');
  },

  signup(request, response) {
    const viewData = {
      title: 'Sign up to WeatherTop',
    };
    response.render('signup', viewData);
  },

  settings(request, response) {
    const user = accounts.getCurrentUser(request);
    if (user) {
      const viewData = {
        user: user
      };
      response.render('account-settings', viewData);
    } else {
      response.redirect('/login');
    }
  },

  updateName(request, response) {
    const user = accounts.getCurrentUser(request);
    if (user) {
      userStore.updateName(user, request.body.firstName, request.body.lastName);
      response.redirect('/account-settings');
    } else {
      response.redirect('/login');
    }
  },

  updateEmail(request, response) {
    const user = accounts.getCurrentUser(request);
    if (user) {
      userStore.updateEmail(user, request.body.email);
      response.cookie('weathertop', user.email);
      response.redirect('/account-settings');
    } else {
      response.redirect('/login');
    }
  },

  updatePassword(request, response) {
    const user = accounts.getCurrentUser(request);
    if (!user) {
      response.redirect('/login');
    } else if (request.body.oldPassword === user.password) {
      if (request.body.password === request.body.confirmPassword) {
        userStore.updatePassword(user, request.body.password);
        response.redirect('/account-settings');
      } else {
        logger.info("Password update failed: New password and confirm password do not match");
        response.redirect('/account-settings');
      }
    } else {
      logger.info("Password update failed: Old password incorrect");
      response.redirect('/account-settings');
    }
  },

  register(request, response) {
    const user = request.body;
    user.id = uuid.v1();
    userStore.addUser(user);
    logger.info(`registering ${user.email}`);
    response.cookie('weathertop', user.email);
    response.redirect('/dashboard');
  },

  authenticate(request, response) {
    const user = userStore.getUserByEmail(request.body.email);
    if (user) {
      response.cookie('weathertop', user.email);
      if (user.password == request.body.password) {
        logger.info(`logging in ${user.email}`);
        response.redirect('/dashboard');
      } else {
          response.redirect('/login');
      }
    } else {
      response.redirect('/login');
    }
  },

  getCurrentUser(request) {
    const userEmail = request.cookies.weathertop;
    return userStore.getUserByEmail(userEmail);
  },

  deleteAccount(request, response) {
    const user = accounts.getCurrentUser(request);
    if (user) {
      if (user.password === request.body.password) {
        stationStore.removeUserStations(user.id);
        userStore.removeUser(user.id);
        response.redirect('/logout');
      } else {
        response.redirect('/account-settings');
      }
    } else {
      response.redirect('/login');
    }
  },
};

module.exports = accounts;
