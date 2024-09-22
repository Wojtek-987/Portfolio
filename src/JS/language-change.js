const buttons = document.querySelectorAll('#polish, #english');

buttons.forEach(function(button) {
    button.addEventListener('click', function() {
        localStorage.setItem('language', this.id);
        checkLanguage();
    })
});

function checkLanguage() {
    const lang = localStorage.getItem('language');
    if (lang === 'polish' || lang === 'english') {
        // toggle buttons
        if(!document.querySelector(`#${lang}`).classList.contains('active')) {
            buttons.forEach(function(button) {
                button.classList.toggle('active');
            });
        }

        // translate the page
        document.querySelectorAll('[data-' + lang + ']').forEach(function(element) {
            element.innerHTML = element.getAttribute('data-' + lang);
        });
    }
}

checkLanguage();




const picker = document.querySelector('#language-change');
picker.style.opacity = "1";
setTimeout(() => {
    picker.removeAttribute('style')
}, 4000)