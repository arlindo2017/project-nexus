const commentFormHandler = async function (e) {
  try {
    e.preventDefault();

    const post_title = document.querySelector('input[name="post_title"]').value;
    const post_body = document.querySelector(
      'textarea[name="post_body"]'
    ).value;

    console.log(post_title, post_body);

    await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        post_title,
        post_body,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    document.location.replace("/");
  } catch (err) {
    console.error(err);
  }
};

document.querySelector("form").addEventListener("submit", commentFormHandler);
