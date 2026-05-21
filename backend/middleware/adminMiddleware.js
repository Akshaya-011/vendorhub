const authorize = require('./roleMiddleware');
const { ROLES } = require('../utils/constants');

// Simple helper invoking global role checker for admins
const adminOnly = authorize(ROLES.ADMIN);

module.exports = adminOnly;
