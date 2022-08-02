const createError = require("http-errors");
const JWT = require("jsonwebtoken");
const User = require("../Models/User.model");
const { authSchema } = require("../helpers/validationSchema");
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require("../helpers/jwt_helpers");

module.exports = {
  register: async (req, res, next) => {
    try {
      const result = await authSchema.validateAsync(req.body);
      const doesExists = await User.findOne({ email: result.email });
      if (doesExists) {
        throw createError.Conflict(`${req.body.email} is alredy registered!`);
      }
      const user = new User(result);
      const savedUser = await user.save();
      res.send(savedUser);
    } catch (error) {
      next(error);
    }
  },
  login: async (req, res, next) => {
    try {
      const result = await authSchema.validateAsync(req.body);
      const user = await User.findOne({ email: result.email });
      if (!user) throw createError.NotFound("User not found");
      const isPasswordMatched = await user.isValidPassword(result.password);
      if (!isPasswordMatched)
        throw createError.Unauthorized("username/password not matched");
      const accessToken = await signAccessToken(user.id);
      const refreshToken = await signRefreshToken(user.id);
      res.send({ accessToken, refreshToken, user });
    } catch (error) {
      if (error.isJoi === true)
        return next(createError.BadRequest("Invalid username/password"));
      next(error);
    }
  },
};
