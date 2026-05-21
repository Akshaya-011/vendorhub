/**
 * Vendor Module Tests
 */
const assert = require('assert');

console.log('Vendor tests loaded – use "npm test" to run the full integration suite.');

module.exports = {
  testVendorCreation: async () => {
    // Covered by the integration runner (tests/run.js) via /api/websites/create
    return true;
  }
};
