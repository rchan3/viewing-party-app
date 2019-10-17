var express = require('express');
var passport = require('passport');
var router = express.Router();
var partiesCtrl = require('../controllers/parties');

/* GET home page. */

router.get('/', partiesCtrl.index);

router.get('/new-party', function(req, res, next) {
    res.render('parties/newParty', {user:req.user, title: `Create a Party`});
  });

router.get('/:id', partiesCtrl.show);
  
router.post('/new-party',partiesCtrl.create);

router.delete('/:id', partiesCtrl.delete);

router.get('/:id/update', partiesCtrl.createEdit);

router.post('/:id/new-comment', partiesCtrl.createComment);

router.post('/:id/new-anoncomment', partiesCtrl.createAnonComment);

router.post('/:id/edit', partiesCtrl.updateShow)

router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));


router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/',
    failureRedirect : '/'
  }
));

router.get('/logout', function(req,res) {
  req.logout();
  res.redirect('/');
})

module.exports = router;
