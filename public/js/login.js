const loginFormHandler = async (event) => {
    event.preventDefault();

    // Collect values from the login form
    const name = document.querySelector('#name-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (name && password) {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ name, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        const responseBody = await response.json();
        if (response.ok) {
            document.location.replace('/');
        }
        alert(responseBody.message);

    }
};

document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);