module.exports = {
  secret: process.env.JWT_SECRET || 'supersecure_vendorhub_jwt_secret_key_2026_production_ready',
  options: {
    expiresIn: process.env.JWT_EXPIRE || '30d'
  }
};
