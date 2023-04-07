const router = require("express").Router();
const sequelize = require("../config/connection.js");
const { Post, User, Answer, Tag } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Tag,
          attributes: ["tag_name"],
        },
        {
          model: Answer,
          include: [
            {
              model: User,
              attributes: ["name"],
            },
          ],
        },
      ],
      attributes: [
        "post_id",
        "post_title",
        "post_body",
        "date_created",
        "view_count",
        [
          sequelize.literal(
            `(SELECT COUNT(*) FROM answer WHERE answer.post_id = post.post_id)`
          ),
          "answer_count",
        ],
        "flag_count",
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    //res.status(200).json(posts);
    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/posts/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Answer,
          include: [
            {
              model: User,
              attributes: ["name"],
            },
          ],
        },
      ],
    });

    // Increment the view_count field by 1
    postData.view_count += 1;
    await postData.save();

    const post = postData.get({ plain: true });
    // res.status(200).json(post)
    res.render("post", {
      post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get("/profile", async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(10, {
      //req.session.user_id
      attributes: { exclude: ["password"] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render("profile", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});

router.get("/createPost", async (req, res) => {
  try {
    const tags = await Tag.findAll({ raw: true });
    res.render("create_post", {
      tags,
      //logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
