// public/main.js

// Simple client-side JS to enhance the blog experience

// Confirmation before adding a post
const addPostForm = document.querySelector('form');
if (addPostForm) {
    addPostForm.addEventListener('submit', (e) => {
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;

        if (title.trim() === '' || content.trim() === '') {
            e.preventDefault();
            alert('Title and content cannot be empty!');
        } else {
            alert('New post added successfully!');
        }
    });
}

// Smooth scroll for links
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('href');
        if (target.startsWith('#')) {
            document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.location.href = target;
        }
    });
});