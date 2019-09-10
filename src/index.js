const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');

const app = express();
mongoose.connect('mongodb://localhost/mevn')
  .then(db => console.log('DB is connected'))
  .catch(err => console.error(err));

// settings
app.set('port', process.env.port || 3000);

// middlewares
app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());

// routes
app.use('/api/tasks', require('./routes/tasks'));

// static files
app.use(express.static(__dirname + '/public'));

// server in listening
app.listen(app.get('port'), () => {
  console.log('server on port', app.get('port'));
});

