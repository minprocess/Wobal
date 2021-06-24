async function newFormHandler(event) {
    event.preventDefault();
    const userphoto = document.getElementById('pfp-photo-link').value;

    const response = await fetch(`/api/users/user`, {
        method: 'PUT',
        body: JSON.stringify({
            userphoto,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    console.log(response);
    if (response.ok) {
        document.location.replace('/profile');
    } else {
        alert('Failed to update user');
    }
}

document.getElementById('submitButton').addEventListener('click', newFormHandler);
document.getElementById('pfp-photo-link').addEventListener('submit', newFormHandler);

async function removePhoto(event) {
    event.preventDefault();
    const userphoto = null

    const response = await fetch(`/api/users/nophoto`, {
        method: 'PUT',
        body: JSON.stringify({
            userphoto,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    console.log(response);
    if (response.ok) {
        document.location.replace('/profile');
    } else {
        alert('Failed to remove photo');
    }
}

document.getElementById('removePic').addEventListener('click', removePhoto);