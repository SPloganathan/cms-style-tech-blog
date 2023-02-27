function showCommentSectionHandler(event) {
  // hide the already displaying add comment section
  document.querySelectorAll("#comment-section").forEach((eachElement) => {
    eachElement.style.display = "none";
  });
  // update the display property of comment section by navigating to the respective parent node
  event.target.parentNode.parentNode.parentNode.querySelector(
    "#comment-section"
  ).style.display = "block";
}

const saveCommentHandler = async (event) => {
  const parentElement = event.target.parentNode.parentNode.parentNode;
  const blog_id = parentElement.querySelector("#blog_id").value;
  const user_id = parentElement.querySelector("#user_id").value;
  const content = parentElement.querySelector("#comment-text").value;
  if (content && user_id && blog_id) {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ blog_id, user_id, content }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to log in.");
    }
  }
};

document.querySelectorAll("#save-comment").forEach((eachElement) => {
  eachElement.addEventListener("click", saveCommentHandler);
});

document.querySelectorAll("#blog-title").forEach((eachElement) => {
  eachElement.addEventListener("click", showCommentSectionHandler);
});
