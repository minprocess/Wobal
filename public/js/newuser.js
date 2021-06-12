async function newFormHandler(event) {
    event.preventDefault();
    const name = document.getElementById('name-signup').value;
    const email = document.getElementById('email-signup').value;
    const password = document.getElementById('#password-signup').value;

    const response = await fetch(`/api/dish`, {
        method: 'POST',
        body: JSON.stringify({
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