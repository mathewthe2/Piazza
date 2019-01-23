
const express = require('express');
const path = require('path');
const http = require('http');
const cors = require('cors');
const socketio = require('socket.io');
const request = require("request");
const cheerio = require("cheerio");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3001;
const routes = require('./routes');

const passport = require('passport')
const session = require('express-session')
const passportInit = require('./lib/passport.init')
const { SESSION_SECRET } = require('./lib/config')

// const fs = require('fs')
// const certOptions = {
//   key: fs.readFileSync(path.resolve('certs/server.key')),
//   cert: fs.readFileSync(path.resolve('certs/server.crt'))
// }

// const server = https.createServer(certOptions, app)
const server = http.Server(app);

//Set up default mongoose connection
//var mongoDB = 'mongodb+srv://application:applicat10n@cluster0-zcfaz.gcp.mongodb.net/test?retryWrites=true';
var mongoDB = 'mongodb+srv://admin:XNXwjcnehHIkQWos@cluster0-zmnfl.azure.mongodb.net/test?retryWrites=true';
mongoose.connect(mongoDB , { useNewUrlParser: true });
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;
var socketToUserIdMap = new Map();
var userStatus = {};

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const getUserBySocket = socket => [...socketToUserIdMap.values()].find(k => k === socket);
//app.use(cors());
app.use(cors({
  origin: 'http://www.localhost:3000'
}))
// Setup for passport 
app.use(session({ 
  secret: SESSION_SECRET, //process.env.SESSION_SECRET, 
  resave: true, 
  saveUninitialized: true,
}))
app.use(passport.initialize())
passportInit()
app.use(passport.session())



if (process.env.NODE_ENV === 'production') {
  // Serve static files from the React frontend app
  app.use(express.static(path.join(__dirname, 'client/build')))
  // Anything that doesn't match the above, send back index.html
  // app.get('*', (req, res) => {
  //   res.sendFile(path.join(__dirname + '/client/build/index.html'))
  // })
}
// accept JSON objects
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);


server.listen(port, "0.0.0.0", () => console.log(`Listening on port ${port}`));

// Connecting sockets to the server and adding them to the request 
// so that we can access them later in the controller
const io = socketio(server)
app.set('io', io)