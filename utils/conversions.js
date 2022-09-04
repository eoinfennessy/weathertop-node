function celsiusToFahrenheit(celsius) {
    return celsius * 1.8 + 32;
}

weatherCodeToCondition = {
    100: "Clear",
    200: "Partial Clouds",
    300: "Cloudy",
    400: "Light Showers",
    500: "Heavy Showers",
    600: "Rain",
    700: "Snow",
    800: "Thunder"
};

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

module.exports = {
    celsiusToFahrenheit,
    weatherCodeToCondition,
    windSpeedToBeaufort
};
