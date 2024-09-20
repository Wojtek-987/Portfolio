// === Get current year for footer copyright ===
const year = new Date().getFullYear();
const yearSpan = document.querySelector('#current-year');
yearSpan.innerHTML = year.toString();


// === Copy emails to clipboard ===
const copyEmail = document.querySelectorAll('.copy-to-clipboard');
copyEmail.forEach((e) => {
    e.addEventListener('mouseup', () => {
        navigator.clipboard.writeText(e.textContent).then(() => {
            console.info('Email copied to clipboard');
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    });
});