const router = require("express").Router();
const { Blog } = require("../models");
// const withAuth = require('../utils/auth');

// below route will renders the homepage of the blog
router.get("/", async (req, res) => {
  try {
    const blogData = await Blog.findAll();

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render("homepage", {
      blogs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get("/login", (req, res) => {
//   // TODO: Add a comment describing the functionality of this if statement
//   if (req.session.logged_in) {
//     res.redirect("/");
//     return;
//   }

//   res.render("login");
// });

module.exports = router;
