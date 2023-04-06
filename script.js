const button = Array.from(document.querySelectorAll('span.gl-button-text'))
        .find(el => el.textContent === 'Merge');

if (button) {
    button.addEventListener('click', (e) => {
        if (!confirm('Are you sure?')) {
            e.preventDefault();
        }
    });
}
