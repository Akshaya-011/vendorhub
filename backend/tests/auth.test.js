/**
 * Auth Module Tests
 */
const assert = require('assert');
const AuthService = require('../services/authService');

console.log('Auth tests loaded – use "npm test" to run the full integration suite.');

module.exports = {
  testRegisterUserReturnsToken: async () => {
    // This test requires a live MongoDB connection
    const result = await AuthService.registerUser({
      name: 'Unit Test User',
      email: `unit_${Date.now()}@test.com`,
      password: 'test123456'
    });
    assert(result.token, 'Token should be present');
    assert(result.user.id, 'User ID should be present');
    return true;
  }
};
