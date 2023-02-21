const router = require("express").Router();
const Blog = require("../../models/Blog");

// GET all blogs
router.get("/", async (req, res) => {
  // Get all blogs from the blog table
  try {
    const data = await Blog.findAll();
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Updates blog based on its id
router.put("/:id", async (req, res) => {
  // Calls the update method on the blog model
  try {
    const updatedData = await Blog.update(
      {
        // All the fields you can update and the data attached to the request body.
        title: req.body.title,
        content: req.body.content,
      },
      {
        // Gets the blogs based on the id given in the request parameters
        where: {
          id: req.params.id,
        },
      }
    );
    if (updatedData[0]) {
      res.status(200).json({ message: "Updated Successfully" });
    } else {
      res.status(404).json({ message: "Insufficient data" });
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete route for a blog with a matching id
router.delete("/:id", async (req, res) => {
  // Looks for the blogs based on id given in the request parameters and deletes the instance from the database
  try {
    const deletedData = await Blog.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (deletedData) {
      res.status(200).json({ message: "Deleted Successfully" });
    } else {
      res.status(404).json({ message: "No blog belongs to this ID" });
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

// creating routes for adding blogs
router.post("/", async (req, res) => {
  try {
    const blogData = await Blog.create(req.body);
    if (blogData) {
      res.status(200).json({ message: "Blog created successfully!" });
    } else {
      res.status(404).json({ message: "insufficient data" });
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
