const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  
  weight: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});
const progress=mongoose.model('progresses', progressSchema);
module.exports =progress