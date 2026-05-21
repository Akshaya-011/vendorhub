const { validateEmail, validatePassword } = require('../utils/validators');
const ApiResponse = require('../utils/apiResponse');

const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || name.trim() === '') {
    return ApiResponse.error(res, 'Name field is required', 400);
  }

  if (!email || !validateEmail(email)) {
    return ApiResponse.error(res, 'Please provide a valid email address format', 400);
  }

  if (!password || !validatePassword(password)) {
    return ApiResponse.error(res, 'Password must be at least 6 characters in length', 400);
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !validateEmail(email)) {
    return ApiResponse.error(res, 'Please provide a valid email address format', 400);
  }

  if (!password) {
    return ApiResponse.error(res, 'Password is required to authenticate', 400);
  }

  next();
};

const validateWebsiteCreate = (req, res, next) => {
  const { businessName, businessType } = req.body;

  if (!businessName || businessName.trim() === '') {
    return ApiResponse.error(res, 'businessName is required to initialize a website tenant', 400);
  }

  if (!businessType || businessType.trim() === '') {
    return ApiResponse.error(res, 'businessType sector category is required', 400);
  }

  next();
};

module.exports = {
  validateRegister,
  validateLogin,
  validateWebsiteCreate
};
