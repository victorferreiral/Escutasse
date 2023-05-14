const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Album = new Schema({
  tittle: {
    type: String
  },
  artist: {
    type: String
  },
  year: {
    type: Number
  },
  picture: {
    type: String
  },
  description: {
    type: String
  }
},{
    collection: 'album'
});

module.exports = mongoose.model('Album', Album);