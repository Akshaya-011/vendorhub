const validateEmail = (email) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const validatePassword = (password) => {
  // Password must be at least 6 characters
  return password && password.length >= 6;
};

module.exports = {
  validateEmail,
  validatePassword
};
