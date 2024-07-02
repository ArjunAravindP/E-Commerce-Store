const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongodbStore = require('connect-mongodb-session')(session);
const cors = require('cors');
const Auth = require('./Midleware/authenticate');
const MongoDb = require('stripe')(process.env.MONGODB_CONNECTION);

require('dotenv').config();

const errorController = require('./controllers/error');

const User = require('./models/user');

const MONGODB_URI = MongoDb;

const app = express();
app.use(
  cors({
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200,
  })
);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // allow all domains
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  next();
});
app.use(Auth);

const store = new MongodbStore({
  uri: MONGODB_URI,
  collection: 'sessions',
});

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use('/images', express.static('images')); // Serve uploaded images

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          username: 'max',
          email: 'max@gamil.com',
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });

    app.listen(8080);
  })
  .catch((err) => {
    console.log(err);
  });
