
var express = require('express');
var path = require('path');
var http = require('http')
var socketio = require('socket.io');
var request = require("request");
var cheerio = require("cheerio");
var mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3001;
const server = http.Server(app);
const websocket = socketio(server);
const routes = require('./routes');

// Old chat
// app.use(express.static('admin_page'));

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

if (process.env.NODE_ENV === 'production') {
  // Serve static files from the React frontend app
  app.use(express.static(path.join(__dirname, 'client/build')))
  // Anything that doesn't match the above, send back index.html
  // app.get('*', (req, res) => {
  //   res.sendFile(path.join(__dirname + '/client/build/index.html'))
  // })
}
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);





server.listen(port, "0.0.0.0", () => console.log(`Listening on port ${port}`));

// The event will be called when a client is connected.
websocket.on('connection', (socket) => {
  console.log('A client just joined on', socket.id);
  websocket.to('admin').emit('update users', socket.id);

  socket.on('disconnect', function(){
    console.log('user disconnected');
    const userId = getUserBySocket(socket.id);
    userStatus[userId] = false;
    websocket.to('admin').emit('update users', socket.id);
  });

  socket.on('reconnect', function() {
    console.log('reconnect fired!');
    websocket.to('admin').emit('update users', socket.id);
  });

  socket.on('requestId', () => {
    new User({
      name    : "",
    }).save( function ( err, user, count ){
      if( err ) return next( err );
      console.log("new user", user);
      const userId = user._id;
      socket.emit('generateId', userId);
      userStatus[userId] = true;
      socketToUserIdMap.set(userId, socket.id);
      socket.join(userId);
    });
  });

  socket.on('registered user', (userId) => {
    userStatus[userId] = true;
    socketToUserIdMap.set(userId, socket.id);
    socket.join(userId);
  });

  socket.on('chat message', function(msgObj){
    if(msgObj.user.type === 'admin'){
      websocket.to(msgObj.recipient).emit('chat message', msgObj);
      websocket.to("admin").emit('chat message', msgObj);
    } else {
      websocket.to("admin").emit('chat message', msgObj);
    }
  });

  socket.on('admin mounted', function(userId){
    socket.join("admin");
  });
});
