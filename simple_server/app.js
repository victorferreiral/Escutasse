var express = require('express'),
path = require('path'),
bodyParser = require('body-parser'),
cors = require('cors'),
mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/mean', { useNewUrlParser: true, useUnifiedTopology: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)});

const userRoute = require('./routes/user.route');
const industryRoute = require('./routes/industry.route');
const albumRoute = require('./routes/album.route');
var app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/user', userRoute);
app.use('/industry', industryRoute);
app.use('/album', albumRoute);
app.get('/', function(req, res){
   res.send("Hello World!");
});

app.listen(3000,function(){
    console.log('Listening on port 3000!');
});