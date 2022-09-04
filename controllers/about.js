"use strict";

const logger = require("../utils/logger");

const about = {
  index(request, response) {
    logger.info("Rendering about");
    const viewData = {
      title: "About WeatherTop",
    };
    response.render("about", viewData);
  },
};

module.exports = about;
