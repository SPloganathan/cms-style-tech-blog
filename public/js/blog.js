const createBlogHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#blog-title").value.trim();
  const content = document.querySelector("#blog-content").value.trim();
  const user_id = document.querySelector("#blog-user-id").value.trim();

  if (title && content) {
    const response = await fetch("/api/blogs", {
      method: "POST",
      body: JSON.stringify({ title, content, user_id }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to create blog.");
    }
  }
};

document
  .querySelector(".blog-creation-form")
  .addEventListener("submit", createBlogHandler);
