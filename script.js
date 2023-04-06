const mergeButton = Array.from(document.querySelectorAll('span.gl-button-text'))
        .find(el => el.textContent === 'Merge');

if (mergeButton) {
    mergeButton.parentNode.style.backgroundColor = 'red';
    mergeButton.addEventListener('click', (e) => {
        if (!confirm('Are you sure?')) {
            e.preventDefault();
        }
    });
}

const approveButton = document.querySelector('button[data-qa-selector="approve_button"]');

if (approveButton) {
    approveButton.style.color = 'white';
    approveButton.style.backgroundColor = 'green';
}
