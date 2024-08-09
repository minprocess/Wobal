//const getPresignedUrl = require("../../controllers/getPresignedURL");

async function newPostHandler(event) {
  event.preventDefault();

  const name = document.getElementById("post-title").value;
  const description = document.getElementById("post-text").value;
	const fileInput = document.getElementById("post-pic-file");
	const file = fileInput.files[0];
  const photo = document.getElementById("post-pic-file").value;

	console.log("**** newPostHandler name", name);	
	console.log("newPostHandler event", event);
	console.log("file", file);
	console.log("photo", file.name);

  const response = await fetch("/api/users/post", {
    method: "POST",
    body: JSON.stringify({
      name,
      description,
      photo,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
		// if there is a file to upload, first get a presigned url for PUT operation to S3 bucket,
		// then upload the file to the s3 bucket
		if (file) {
  		// The route for this fetch is in controllers/api/user-routes.js
			const url = await fetch("/api/users/getpresignedurlforput",{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ fname: file.name })
			})
			.then(response => response.text())
			.catch(error => {console.error('Error from /api/users/getpresignedurl:', error)});

			// post the image direclty to the s3 bucket
			// "Content-Type": "multipart/form-data" -- miight also work
			console.log("newpost.js file.type", file.type);
			await fetch(url, {
				method: "PUT",
				headers: {
					"Content-Type": file.type // Ensure the Content-Type matches the file type
				},
				body: file
			})
			.then(response => response.json())
			//.then(data => console.log('Success:', data))
			.catch(error => console.log('Error upload:', error));
		}
		/*
    const resp2 = await fetch("/api/users/s3-upload", {
      method: "POST",
      body: photo,
      headers: {
        "Content-Type": "application/string",
      },
    });
		*/
    document.location.replace("/profile");
  } else {
    alert("Failed to add post");
  }
}


console.log("newpost.js addEventListener");
document.getElementById("createpost").addEventListener("click", newPostHandler);
//document.getElementById('post-form').addEventListener('submit', newPostHandler);
