const newCommnetHandler = async (event) => {
    event.preventDefault();

    const comment = document.querySelector('#blogComment').value.trim();
    const blog_id = document.querySelector('#commentForm').getAttribute('blogid');
    const user_id = document.querySelector('#commentForm').getAttribute('userid');


    if (comment && blog_id && user_id) {
        const response = await fetch('/api/comments/', {
            method: 'POST',
            body: JSON.stringify({ comment, blog_id, user_id }),
            headers: { 'Content-Type': 'application/json' },
        });

        const responseBody = await response.json();
        if (response.ok) {
            document.location.reload();
        }
        alert(responseBody.message);
    }
};

document
    .querySelector('#submitComment')
    .addEventListener('click', newCommnetHandler);