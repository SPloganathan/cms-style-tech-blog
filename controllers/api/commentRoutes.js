const router = require("express").Router();
const Comment = require("../../models/Comment");

// GET all comments
router.get("/", async (req, res) => {
  // Get all comments from the comment table
  try {
    const data = await Comment.findAll();
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Updates comment based on its id
router.put("/:id", async (req, res) => {
  // Calls the update method on the comment model
  try {
    const updatedData = await Comment.update(
      {
        // All the fields you can update and the data attached to the request body.
        content: req.body.content,
      },
      {
        // Gets the comments based on the id given in the request parameters
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

// Delete route for a comment with a matching id
router.delete("/:id", async (req, res) => {
  // Looks for the comments based on id given in the request parameters and deletes the instance from the database
  try {
    const deletedData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (deletedData) {
      res.status(200).json({ message: "Deleted Successfully" });
    } else {
      res.status(404).json({ message: "No comment belongs to this ID" });
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

// creating routes for adding comments
router.post("/", async (req, res) => {
  try {
    const commentData = await Comment.create(req.body);
    if (commentData) {
      res.status(200).json({ message: "Comment created successfully!" });
    } else {
      res.status(404).json({ message: "insufficient data" });
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
