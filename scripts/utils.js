/**
 * Utility functions for the Impact Evaluation App
 */

/**
 * Generate a random number between min and max (inclusive)
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random number between min and max
 */
function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Generate a random integer between min and max (inclusive)
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random integer between min and max
 */
function randomIntBetween(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generate a random boolean with a given probability of being true
 * @param {number} probability - Probability of returning true (0-1)
 * @returns {boolean} Random boolean
 */
function randomBoolean(probability = 0.5) {
    return Math.random() < probability;
}

/**
 * Format a number to a specified number of decimal places
 * @param {number} value - Number to format
 * @param {number} decimalPlaces - Number of decimal places
 * @returns {string} Formatted number as a string
 */
function formatNumber(value, decimalPlaces = CONFIG.DISPLAY.DECIMAL_PLACES) {
    return value.toFixed(decimalPlaces);
}

/**
 * Calculate fishing pressure based on x-coordinate
 * Fishing pressure decreases from left to right
 * @param {number} x - X-coordinate (0-based)
 * @param {number} gridSize - Size of the grid
 * @returns {number} Fishing pressure value (0-1)
 */
function calculateFishingPressure(x, gridSize = CONFIG.GRID_SIZE) {
    // Linear gradient from 1 (left) to 0 (right)
    return 1 - (x / (gridSize - 1));
}

/**
 * Calculate probability of a cell being a no-take zone based on fishing pressure
 * @param {number} fishingPressure - Fishing pressure value (0-1)
 * @returns {number} Probability of being a no-take zone (0-1)
 */
function calculateNoTakeProbability(fishingPressure) {
    const biasStrength = CONFIG.NO_TAKE_ZONE.BIAS_STRENGTH;
    // Inverse relationship with fishing pressure, modified by bias strength
    return (1 - fishingPressure) * biasStrength + (1 - biasStrength) * 0.5;
}

/**
 * Create a deep copy of an object
 * @param {Object} obj - Object to copy
 * @returns {Object} Deep copy of the object
 */
function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * Check if a value is within a specified range
 * @param {number} value - Value to check
 * @param {number} min - Minimum value (inclusive)
 * @param {number} max - Maximum value (inclusive)
 * @returns {boolean} True if value is within range
 */
function isInRange(value, min, max) {
    return value >= min && value <= max;
}

/**
 * Calculate the mean of an array of numbers
 * @param {Array<number>} values - Array of numbers
 * @returns {number} Mean value
 */
function calculateMean(values) {
    if (values.length === 0) return 0;
    const sum = values.reduce((acc, val) => acc + val, 0);
    return sum / values.length;
}

/**
 * Calculate the difference between two values
 * @param {number} value1 - First value
 * @param {number} value2 - Second value
 * @returns {number} Absolute difference
 */
function calculateDifference(value1, value2) {
    return Math.abs(value1 - value2);
}
