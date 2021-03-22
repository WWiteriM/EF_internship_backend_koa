const { Strategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/users');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
};

module.exports = (passport) => {
  passport.use(
    new Strategy(options, async (payload, done) => {
      const user = await User.query().findById(payload.id);
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    }),
  );
};
