// Translate the page
const lang = localStorage.getItem('language');
document.querySelectorAll('[data-' + lang + ']').forEach(function(element) {
    element.innerHTML = element.getAttribute('data-' + lang);
});