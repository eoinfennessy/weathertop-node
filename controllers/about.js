"use strict";

const logger = require("../utils/logger");

const about = {
  index(request, response) {
    logger.info("Rendering about");
    let isUserLoggedIn = Boolean(request.cookies.weathertop);
    const viewData = {
      title: "About WeatherTop",
      isUserLoggedIn: isUserLoggedIn
    };
    response.render("about", viewData);
  },
};

module.exports = about;
