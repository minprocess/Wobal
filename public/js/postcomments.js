document.querySelectorAll("form").forEach((element) =>
  element.addEventListener("submit", async function newComment(event) {
    event.preventDefault();
    const commentData = event.originalTarget[0].value;
    const post_id = element.childNodes[1].classList[0];

    const response = await fetch("/api/users/newComment", {
      method: "POST",
      body: JSON.stringify({
        commentData,
        post_id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    //console.log(response);
    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to add comment");
    }
  }),
);
