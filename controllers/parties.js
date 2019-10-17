const Party = require('../models/party');
const User = require('../models/user');

const create = (req, res) => {
  console.log("create");
    for (let key in req.body) {
      if (req.body[key] === '') delete req.body[key];
    }

    var party = new Party({
        name: req.body.name,
        date:req.body.date,
        type:req.body.type,
        address:req.body.address,
        creator: req.user,           
        creatorId: req.user.googleId
    });
    party.attendees.push(req.user);
    party.save(function(err) {
        console.log(party);
      // one way to handle errors
      if (err) return res.render('/parties/new-party');
      
      // for now, redirect right back to new.ejs
      res.redirect('/parties');
    });
  }
  

  function createComment(req, res) {
    console.log("create comment");
    Party.findById(req.params.id).exec( function(err, party) {
      let temp = {
        content: req.body.comment,
        author: req.user.name
      }
      party.comments.push(temp);
      party.save(function(err) {
        res.redirect(`/parties/${party._id}`);
      });
    })}
  
    function createAnonComment(req, res) {
      console.log("create comment");
      Party.findById(req.params.id).exec( function(err, party) {
        let temp = {
          content: req.body.comment,
          author: "Anonymous"
        }
        party.comments.push(temp);
        party.save(function(err) {
          res.redirect(`/parties/${party._id}`);
        });
      })}
  
  const deleteParty = (req, res) => {
    console.log("delparty");
    Party.findById(req.params.id, function (err, party) {
      if (err) {
          // handle error
      }

      party.remove();
    res.redirect('/parties');
  })}

  const updateShow = (req, res) => {
    console.log("update");
    Party.findById(req.params.id, function (err, party) {
      party.name = req.body.name;
      party.date = req.body.date;
      party.type = req.body.type;
      party.address = req.body.address;

       party.save(function (err) {
    console.log(party);
      if (err) {
          // handle error
          res.redirect('/parties');
        }      
      res.redirect(`/parties/${party._id}`);
    })})}

  const createEdit = (req, res) => {
    console.log("to edit party");
    Party.findById(req.params.id, function (err, party) {
      if (err) {
          // handle error
      }      
      res.render('parties/editParty', {user:req.user,party, title: `Edit Party`})
    })}

  function show(req, res) {
    console.log("show");
    Party.findById(req.params.id).populate('creator').populate('attendees').exec( function(err, party) {
        if (!party) {
          return res.redirect('/parties');
        }   
        res.render('parties/show', { user:req.user,title: 'Party Detail', party });
    });
  }  

  const index = (req, res) => {
    console.log("index");
    Party.find({}).exec(function(err, parties) {
      if (err) {
        // handle error
      }
      return res.render('parties/index', { user:req.user,title:`All Parties`,parties });
    });
  }

  module.exports = {
    create,
    createEdit,
    delete: deleteParty,
    createComment,
    createAnonComment,
    index,
    show,
    updateShow
  }


