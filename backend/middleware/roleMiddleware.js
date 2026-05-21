const ApiResponse = require('../utils/apiResponse');

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return ApiResponse.error(res, 'Access denied, missing session user parameters', 401);
    }
    
    if (!roles.includes(req.user.role)) {
      return ApiResponse.error(
        res, 
        `Access denied. Role '${req.user.role}' is not authorized to access this resource`, 
        403
      );
    }
    
    next();
  };
};

module.exports = authorize;
