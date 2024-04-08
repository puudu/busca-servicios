exports.setUserId = (req, res, next) => {
  // if (!req.body.user) req.body.user = req.user.id;
  req.body.user = process.env.DEFAULT_USER_ID;
  next();
};
