const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 3000;
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./db.config');
const ctvRoute = require('./src/backend/routes/ctv.route');
const svRoute = require('./src/backend/routes/sinhvien.route');
mongoose.Promise = global.Promise;
mongoose.connect(config.url, { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/sinhvien', svRoute);
app.use('/ctv', ctvRoute);

app.listen(PORT, function(){
  console.log('Server is running on Port:',PORT);
});