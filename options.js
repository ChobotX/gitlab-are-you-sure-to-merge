const DEFAULT_REGEX = 'https?:\/\/gitlab.com\/.+?\/merge_requests\/[0-9]+';

const restoreOptions = () => {
    chrome.storage.sync.get('gitlabMergeRequestUrl', ({gitlabMergeRequestUrl}) => {
        const input = document.getElementById('gitlab-merge-request-url');
        if (!gitlabMergeRequestUrl) {
            gitlabMergeRequestUrl = DEFAULT_REGEX;
            input.classList.add('error');
        }
        input.value = gitlabMergeRequestUrl;
    });
};

let saveDebounceTimeout = null;

const saveOptions = (target) => {
    target.classList.remove('error', 'success');
    target.classList.add('loading');
    clearTimeout(saveDebounceTimeout);
    testPattern(document.getElementById('pattern-test'));
    saveDebounceTimeout = setTimeout(() => {
        chrome.storage.sync.set({ gitlabMergeRequestUrl: target.value }, () => {
            target.classList.add('success');
            target.classList.remove('error', 'loading');
        });
        saveDebounceTimeout = null;
    }, 2000);
};

let testDebounceTimeout = null;

const testPattern = (target) => {
    target.classList.remove('error', 'success');
    target.classList.add('loading');
    clearTimeout(testDebounceTimeout);
    testDebounceTimeout = setTimeout(() => {
        const testRegex = new RegExp(document.getElementById('gitlab-merge-request-url').value);
        target.classList.remove('error', 'loading');
        target.classList.add(testRegex.test(target.value) ? 'success' : 'error');
        testDebounceTimeout = null;
    }, 2000);
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('gitlab-merge-request-url').addEventListener(
    'input',
    ({target}) => saveOptions(target)
);
document.getElementById('pattern-test').addEventListener(
    'input',
    ({target}) => testPattern(target)
);
