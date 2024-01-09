const newPostHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#blogTitle').value.trim();
    const description = document.querySelector('#blogBody').value.trim();
    const user_id = document.querySelector('#newblog').getAttribute('userid');

    if (title && description && user_id) {
        const response = await fetch('/api/blogs/', {
            method: 'POST',
            body: JSON.stringify({ title, description, user_id }),
            headers: { 'Content-Type': 'application/json' },
        });

        const responseBody = await response.json();
        if (response.ok) {
            document.location.replace('/dashboard');
        }
        alert(responseBody.message);

    }
};

document
    .querySelector('#postBlog')
    .addEventListener('submit', newPostHandler);