require('dotenv').config();
const DiscordStrategy = require('passport-discord').Strategy;
const Usuario = require('../../models/usuario');
const scopes = ['identify', 'email', 'guilds'];
const passport = require('passport');

passport.deserializeUser(async (id, done) => {
  const user = await Usuario.findOne({ id });
  if (user) {
    done(null, user);
  }
});

passport.serializeUser(async (user, done) => {
  console.log('serializeUser: ', user.id);
  done(null, user.id);
});

passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.REDIRECT_DISCORD_URI,
      scope: scopes
    },
    async function (accessToken, refreshToken, profile, done) {
      console.log('avatar: ', profile.avatar);
      try {
        const user = await Usuario.findOne({ discordId: profile.id });
        if (user) {
          done(null, user);
        } else {
          const newUser = await Usuario.create({
            discordId: profile.id,
            username: profile.username,
            avatar: profile.avatar
          });
          const savedUser = await newUser.save();
          done(null, savedUser);
        }
      } catch (error) {
        console.log('Error in discordstrategy: ', error);
        done(error, null);
      }
    }
  )
);
