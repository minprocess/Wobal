async function newFormHandler(event) {
    event.preventDefault();
    const name = document.getElementById('post-title').value;
    const description = document.getElementById('post-text').value;
    const photo = document.getElementById('post-photo-link').value;

    const response = await fetch(`/api/users/post`, {
        method: 'POST',
        body: JSON.stringify({
            name,
            description,
            photo,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    console.log(response);
    if (response.ok) {
        document.location.replace('/profile');
    } else {
        alert('Failed to add post');
    }
}

document.getElementById('createpost').addEventListener('click', newFormHandler);
document.getElementById('post-form').addEventListener('submit', newFormHandler);

