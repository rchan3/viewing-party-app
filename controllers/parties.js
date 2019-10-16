const Party = require('../models/party');
const User = require('../models/user');

const create = (req, res) => {
    for (let key in req.body) {
      if (req.body[key] === '') delete req.body[key];
    }

    var party = new Party({
        name: req.body.name,
        date:req.body.date,
        type:req.body.type,
        address:req.body.address,
        creator: req.user,           
        creatorId: req.user._id
    });
    party.save(function(err) {
        console.log(party);
      // one way to handle errors
      if (err) return res.render('/parties/new-party');
      
      // for now, redirect right back to new.ejs
      res.redirect('/parties');
    });
  }

  function show(req, res) {
    Party.findById(req.params.id).populate('creator').exec( function(err, party) {
        if (!party) {
          return res.redirect('/parties');
        }   
        res.render('parties/show', { user:req.user,title: 'Party Detail', party });
    });
  }  

  const index = (req, res) => {
    Party.find({}).exec(function(err, parties) {
      if (err) {
        // handle error
      }
      return res.render('parties/index', { user:req.user,title:`All Parties`,parties });
    });
  }

  module.exports = {
    create,
    index,
    show
  }


