const crypto = require("crypto");
const { promesify, promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");
const AppError = require("../utils/appError");

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  // if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token: token,
    data: {
      user,
    },
  });
};

exports.signup = async (req, res, next) => {
  const newUser = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    role: req.body.role,
  });

  createSendToken(newUser, 201, res);
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      new AppError("Por favor, incluya un correo y una contraseña!", 400)
    );
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Correo o contraseña incorrectos", 401));
  }

  createSendToken(user, 200, res);
};

exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "sucesss" });
};

exports.protect = async (req, res, next) => {
  // 1. Getting token and check if i'ts there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError("You are not logged in. Please log in to get access", 401)
    );
  }

  // 2. Verificate token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3. Check if user still exist
  const currentUser = await User.findById(decoded.id);
  if (!currentUser)
    return next(
      new AppError("The user belonging to this token does no longer exist.")
    );

  // 4. Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password. Please log in again", 401)
    );
  }

  req.user = currentUser;
  res.locals.user = currentUser;
  next();
};

// Only for rendered pages, no errors
exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      // 1. Verificate token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      // 2. Check if user still exist
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) return next();

      // 3. Check if user changed password after the token was issued
      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next();
      }

      // THERE IS A LOGGED IN USER
      res.locals.user = currentUser;
      return next();
    } catch (error) {
      return next();
    }
  }
  next();
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("No tienes permisos para realizar esta acción", 403)
      );
    }

    next();
  };
};

exports.updatePassword = async (req, res, next) => {
  // 1.  Get the user from de collection
  const user = await User.findById(req.user.id).select("+password");
  if (!user) return AppError("Usuario no encontrado", 500);

  // 2. Check if password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password)))
    return AppError("La contraseña actual es incorrecta", 401);

  // 3. Update the password
  user.password = req.body.password;
  user.passwordConfirm = req.body.password;
  await user.save();

  // 4. Log user in, send JWT
  createSendToken(user, 200, res);
};
