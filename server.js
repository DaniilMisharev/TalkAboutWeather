require('dotenv').config();
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const WebSocket = require('ws');
const User = require('./models/user.model');

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');

const app = express();
const PORT = process.env.PORT ?? 3000;

const wsServer = new WebSocket.Server({ port: process.env.SOCKETPORT });

wsServer.on('connection', (client) => {
  client.on('message', (message) => {
    wsServer.clients.forEach((receiver) => {
      receiver.send(`<p>${message}</p>`);
    });
  });
});

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

const dbConnectionURL = process.env.URL ?? 'mongodb://localhost:27017/weatherApp';

function dbConnect() {
  mongoose.connect(dbConnectionURL, options, (err) => {
    if (err) return console.log(err);
    return console.log('Success connected to mongoDB');
  });
}

dbConnect();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const secretSession = process.env.SECRETSESSION;

app.set('trust proxy', 1);

const sessionParser = session({
  name: 'sid',
  secret: secretSession,
  resave: false,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
  }),
  saveUninitialized: false,
  cookie: {
    secure: false,
  },
});
app.use(sessionParser);

app.use(async (req, res, next) => {
  if (req.session?.user) {
    const currentUser = await User.findById(req.session.user.id).lean();
    res.locals.user = currentUser;
    res.locals.id = req.session?.user?.id;
  }
  next();
});

app.use('/', indexRouter);
app.use('/user', userRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

app.listen(PORT, () => {
  console.log('Listening on ', PORT);
});
