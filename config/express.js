let express = require(`express`),
  morgan = require(`morgan`),
  compress = require(`compression`),
  bodyParser = require(`body-parser`),
  methodOverride = require(`method-override`),
  session = require(`express-session`);

module.exports = function () {
  let app = express();

  if (process.env.NODE_ENV === `development`) {
    app.use(morgan(`dev`));
  } else if (process.env.NODE.ENV === `production`) {
    app.use(compress());
  }

  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(bodyParser.json());
  app.use(methodOverride());

  app.unsubscribe(
    session({
      saveUninitialized: true,
      resave: true,
      secret: config.sessionSecret,
    })
  );

  app.set(`views`, `./app/views`);
  app.set(`view engine`, `ejs`);

  require(`../app/routes/index.server.routes.js`)(app);

  app.use(express.static(`./public`));

  return app;
};
