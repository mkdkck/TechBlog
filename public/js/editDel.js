const user_id = document.querySelector('#editBlog').getAttribute('userid');
const blog_id = document.querySelector('#editBlog').getAttribute('blogid');

const blogUpdateHandler = async (event) => {
    event.preventDefault();
    const title = document.querySelector('#editBlogTitle').value.trim();
    const description = document.querySelector('#editBlogBody').value.trim();

    if (title && description && user_id) {
        const response = await fetch(`/api/blogs/${blog_id}`, {
            method: 'put',
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

const blogDelHandler = async (event) => {
    event.preventDefault();

    const response = await fetch(`/api/blogs/${blog_id}`, {
        method: 'DELETE',
    });

    const responseBody = await response.json();
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to delete blog');
    }
    alert(responseBody.message);

};


document
    .querySelector('#blogUpdate')
    .addEventListener('click', blogUpdateHandler);

document
    .querySelector('#blogDelete')
    .addEventListener('click', blogDelHandler);