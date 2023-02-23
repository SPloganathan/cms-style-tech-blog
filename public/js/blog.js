const createBlogHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#blog-title").value.trim();
  const content = document.querySelector("#blog-content").value.trim();
  const user_id = document.querySelector("#blog-user-id").value.trim();
  const blog_id = document.querySelector("#blog-id").value.trim();

  if (title && content && user_id) {
    let response;
    // below if block denoted the blog update fetch
    if (blog_id !== "") {
      response = await fetch("/api/blogs/" + blog_id, {
        method: "PUT",
        body: JSON.stringify({ title, content, user_id }),
        headers: { "Content-Type": "application/json" },
      });
    } else {
      response = await fetch("/api/blogs", {
        method: "POST",
        body: JSON.stringify({ title, content, user_id }),
        headers: { "Content-Type": "application/json" },
      });
    }

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to create blog.");
    }
  }
};

const deleteBlogHandler = async (event) => {
  event.preventDefault();
  const blog_id = document.querySelector("#blog-id").value.trim();

  if (blog_id) {
    const response = await fetch("/api/blogs/" + blog_id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to delete blog.");
    }
  }
};

document
  .querySelector(".blog-creation-form")
  .addEventListener("submit", createBlogHandler);

document
  .querySelector("#blog-delete")
  .addEventListener("click", deleteBlogHandler);
