// const router = require("express").Router();
// const { User } = require("../models");

// // router.get("/profile", async (req, res) => {
// //   // fetch user data from database
// //   const user = await User.findOne({ where: { user_id: req.session.user_id } });

// //   // render the profile view and pass user data to the view
// //   res.render("profile", {
// //     user,
// //     logged_in: req.session.logged_in,
// //     name: req.session.name,
// //     user_id: req.session.user_id,
// //   });
// // });

// //   for logout if not handled in the main route
// router.post("/logout", (req, res) => {
//   // destroy the session and redirect to the home page
//   req.session.destroy();
//   res.redirect("/");
// });

// module.exports = router;
