const User = require('../models/User');
const Vendor = require('../models/Vendor');
const generateToken = require('../utils/generateToken');
const { ROLES } = require('../utils/constants');
const { slugify } = require('../utils/helpers');

class AuthService {
  /**
   * Register a new user and potentially setup a base Vendor workspace
   */
  static async registerUser(userData) {
    const { name, email, password, role } = userData;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const err = new Error('User already exists in the system registry');
      err.statusCode = 400;
      throw err;
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role: role || ROLES.VENDOR
    });

    const token = generateToken(user._id);

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    };
  }

  /**
   * Standard email/password login authentication
   */
  static async loginUser(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
      const err = new Error('Invalid email or password credentials');
      err.statusCode = 401;
      throw err;
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      const err = new Error('Invalid email or password credentials');
      err.statusCode = 401;
      throw err;
    }

    const token = generateToken(user._id);

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    };
  }

  /**
   * Google OAuth login handler
   */
  static async googleLogin(googleData) {
    const { email, name, googleId, profileImage } = googleData;

    let user = await User.findOne({ email });

    if (user) {
      // User exists, check if googleId is set
      if (!user.googleId) {
        user.googleId = googleId;
        if (!user.profileImage) user.profileImage = profileImage;
        await user.save();
      }
    } else {
      // Create new Google-authenticated user
      user = await User.create({
        name,
        email,
        googleId,
        profileImage,
        role: ROLES.VENDOR,
        isVerified: true
      });
    }

    const token = generateToken(user._id);

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    };
  }
}

module.exports = AuthService;
