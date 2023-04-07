
const router = require("express").Router();
const { User} = require("../models");

router.get('/profile', async (req, res) => {
    // fetch user data from database
    const user = await User.findOne({ where: { id: req.user.id } });
  
    // render the profile view and pass user data to the view
    res.render('profile', { user });
  });
  

//   for logout if not handled in the main route
  router.post('/logout', (req, res) => {
    // destroy the session and redirect to the home page
    req.session.destroy();
    res.redirect('/');
  });

module.exports = router;