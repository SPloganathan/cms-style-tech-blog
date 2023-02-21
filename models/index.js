// importing required models
const User = require("./User");
const Blog = require("./Blog");
const Comment = require("./Comment");
// setting Relationship between User and Blog
User.hasMany(Blog, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});
// setting Relationship between Blog and Comment
Blog.hasMany(Comment, {
  foreignKey: "blog_id",
  onDelete: "CASCADE",
});
// setting Relationship between User and Comment
User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// setting Association between User and Blog
Blog.belongsTo(User, {
  foreignKey: "user_id",
});
// setting Association between Blog and Comment
Comment.belongsTo(Blog, {
  foreignKey: "blog_id",
});
// setting Association between User and Comment
Comment.belongsTo(User, {
  foreignKey: "user_id",
});

// exporting models
module.export = { User, Blog, Comment };
