const slowDown = require("express-slow-down");

// Limiter spam de publication
const speedLimit = slowDown({
    windowMs: 60 * 60 * 1000,
    delayAfter: 5,
    delayMs: 5000,
});

// Limite : 5 post max par heure, puis délais de 5 secondes

module.exports = speedLimit;
