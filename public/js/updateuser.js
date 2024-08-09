async function updateUserHandler(event) {
  event.preventDefault();
  const userphoto = document.getElementById("profile-pic-file").value;
  console.log("***** link *******", userphoto);

  const response = await fetch("/api/users/user", {
    method: "PUT",
    body: JSON.stringify({
      userphoto,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  //console.log(response);
  if (response.ok) {
    document.location.replace("/profile");
  } else {
    alert("Failed to update user");
  }
}

document
  .getElementById("submitButton")
  .addEventListener("click", updateUserHandler);
document
  .getElementById("profile-pic-file")
  .addEventListener("submit", updateUserHandler);

async function removePhoto(event) {
  event.preventDefault();
  const userphoto = null;

  const response = await fetch("/api/users/nophoto", {
    method: "PUT",
    body: JSON.stringify({
      userphoto,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  //console.log(response);
  if (response.ok) {
    document.location.replace("/profile");
  } else {
    alert("Failed to remove photo");
  }
}
console.log("updateuser.js addEventListener");
document.getElementById("removePic").addEventListener("click", removePhoto);
