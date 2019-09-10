const mongoose = require('mongoose');
const { Schema } = mongoose;

const task = new Schema({
  title: String,
  description: String
});

module.exports = mongoose.model('task', task);
