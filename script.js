const maxAttempts = 30;
let attempts = 0;

const updateButtons = () => {
    attempts++;
    const mergeButton = Array.from(document.querySelectorAll('span.gl-button-text'))
        .find(el => el.textContent === 'Merge');

    const approveButton = document.querySelector('button[data-qa-selector="approve_button"]');

    if (approveButton) {
        approveButton.style.color = 'white';
        approveButton.style.backgroundColor = 'green';
    }

    if (mergeButton) {
        mergeButton.parentNode.style.backgroundColor = 'red';
        mergeButton.addEventListener('click', (e) => {
            if (!confirm('Are you sure you want to merge this?')) {
                e.preventDefault();
                e.stopPropagation();
                window.location.reload();
            }
        });
    } else {
        if (attempts < maxAttempts) {
            setTimeout(updateButtons, 100);
        }
    }
};

chrome.storage.sync.get('gitlabMergeRequestUrl', ({gitlabMergeRequestUrl}) => {
    if (gitlabMergeRequestUrl && new RegExp(gitlabMergeRequestUrl).test(window.location.href)) {
        updateButtons();
    }
});
