const router = require("express").Router();
const Post = require("../../models/Post");
//const withAuth = require("../../utils/auth");

//withAuth
router.post("/", async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      // user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

//withAuth
router.delete("/:id", async (req, res) => {
  try {
    const deletePost = await Post.destroy({
      where: {
        post_id: req.params.id,
        //  user_id: req.session.user_id,
      },
    });

    if (!deletePost) {
      res.status(404).json({ message: "No project found with this id!" });
      return;
    }

    res.status(200).json(deletePost);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
