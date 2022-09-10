function celsiusToFahrenheit(celsius) {
  let fahrenheit = celsius * 1.8 + 32;
  return Number(fahrenheit.toFixed(2));
}

const weatherCodeToCondition = {
  100: "Clear",
  200: "Partial Clouds",
  300: "Cloudy",
  400: "Light Showers",
  500: "Heavy Showers",
  600: "Rain",
  700: "Snow",
  800: "Thunder"
};

const weatherCodeToIcon = {
  100: "sun",
  200: "cloud sun",
  300: "cloud",
  400: "cloud rain",
  500: "cloud showers heavy",
  600: "umbrella",
  700: "snowflake",
  800: "bolt"
}

function windSpeedToBeaufort(windSpeed) {
  if (windSpeed == 0) {
    return 0;
  } else if (windSpeed >= 1 && windSpeed <= 6) {
    return 1;
  } else if (windSpeed >= 7 && windSpeed <= 11) {
    return 2;
  } else if (windSpeed >= 12 && windSpeed <= 19) {
    return 3;
  } else if (windSpeed >= 20 && windSpeed <= 29) {
    return 4;
  } else if (windSpeed >= 30 && windSpeed <= 39) {
    return 5;
  } else if (windSpeed >= 40 && windSpeed <= 50) {
    return 6;
  } else if (windSpeed >= 51 && windSpeed <= 62) {
    return 7;
  } else if (windSpeed >= 63 && windSpeed <= 75) {
    return 8;
  } else if (windSpeed >= 76 && windSpeed <= 87) {
    return 9;
  } else if (windSpeed >= 88 && windSpeed <= 102) {
    return 10;
  } else if (windSpeed >= 103 && windSpeed <= 117) {
    return 11;
  } else if (windSpeed >= 117) {
    return 12;
  }
  return -1;
}

function calculateWindChill(temp, speed) {
  let windChill = 13.12 + 0.6215 * temp - 11.37 * Math.pow(speed, 0.16) + 0.3965 * temp * Math.pow(speed, 0.16);
  return Number(windChill.toFixed(2));
}

function degreesToCardinalDirection(degrees) {
  if (degrees < 0 || degrees > 360) {
    return "Invalid entry: " + degrees;
  } else if (degrees >= 348.75 || degrees < 11.25) {
    return "N";
  } else if (degrees < 33.75) {
    return "NNE";
  } else if (degrees < 56.25) {
    return "NE";
  } else if (degrees < 78.75) {
    return "ENE";
  } else if (degrees < 101.25) {
    return "E";
  } else if (degrees < 123.75) {
    return "ESE";
  } else if (degrees < 146.25) {
    return "SE";
  } else if (degrees < 168.75) {
    return "SSE";
  } else if (degrees < 191.25) {
    return "S";
  } else if (degrees < 213.75) {
    return "SSW";
  } else if (degrees < 236.25) {
    return "SW";
  } else if (degrees < 258.75) {
    return "WSW";
  } else if (degrees < 281.25) {
    return "W";
  } else if (degrees < 303.75) {
    return "WNW";
  } else if (degrees < 326.25) {
    return "NW";
  } else {
    return "NNW";
  }
}

module.exports = {
  celsiusToFahrenheit,
  weatherCodeToCondition,
  windSpeedToBeaufort,
  calculateWindChill,
  degreesToCardinalDirection,
  weatherCodeToIcon
};
