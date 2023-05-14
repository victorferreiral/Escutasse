const express = require('express');
const app = express();
const albumRoutes = express.Router();

let Album = require('../model/Album');

// api to add album
albumRoutes.route('/add').post(function (req, res) {
  let album = new Album(req.body);
  album.save()
  .then(album => {
    res.status(200).json({'status': 'success','mssg': 'album added successfully'});
  })
  .catch(err => {
    res.status(409).send({'status': 'failure','mssg': 'unable to save to database'});
  });
});

// api to get albuns
albumRoutes.route('/').get(function (req, res) {
  Album.find(function (err, albuns){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','albuns': albuns});
    }
  });
});

// api to get album
albumRoutes.route('/album/:id').get(function (req, res) {
  let id = req.params.id;
  Album.findById(id, function (err, album){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','album': album});
    }
  });
});

// api to update route
albumRoutes.route('/update/:id').put(function (req, res) {
    Album.findById(req.params.id, function(err, album) {
    if (!album){
      res.status(400).send({'status': 'failure','mssg': 'Unable to find data'});
    } else {

        album.tittle = req.body.tittle;
        album.artist = req.body.artist;
        album.year = req.body.year;
        album.picture = req.body.picture;
        album.description = req.body.description;


        album.save().then(business => {
          res.status(200).json({'status': 'success','mssg': 'Update complete'});
      })
    }
  });
});

// api for delete
albumRoutes.route('/delete/:id').delete(function (req, res) {
  Album.findByIdAndRemove({_id: req.params.id}, function(err,){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','mssg': 'Delete successfully'});
    }
  });
});

module.exports = albumRoutes;