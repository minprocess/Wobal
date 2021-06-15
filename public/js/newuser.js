async function newFormHandler(event) {
    event.preventDefault();
    const fullname = document.getElementById('name-signup').value;
    const username = document.getElementById('username-signup').value;
    const email = document.getElementById('email-signup').value;
    const password = document.getElementById('password-signup').value;

    const response = await fetch(`/api/users/newuser`, {
        method: 'POST',
        body: JSON.stringify({
            fullname,
            username,
            email,
            password,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        document.location.replace('/login');
    } else {
        alert('Failed to add user');
    }
}

document.getElementById('signupform').addEventListener('submit', newFormHandler);