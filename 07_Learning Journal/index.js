document.addEventListener('DOMContentLoaded', function () {
    const btn1 = document.getElementById('view-btn-1');
    const btn2 = document.getElementById('view-btn-2');
    const btn3 = document.getElementById('view-btn-3');
    const hamburger = document.getElementById('hamburger-menu');

    if (btn1) {
        btn1.addEventListener('click', function () {
            Array.from(document.getElementsByClassName('view-1')).forEach(element => {
                element.classList.remove('view-1');
            });

            btn1.classList.add('view-1');
        });
    }

    if (btn2) {
        btn2.addEventListener('click', function () {
            Array.from(document.getElementsByClassName('view-2')).forEach(element => {
                element.classList.remove('view-2');
            });
            btn2.classList.add('view-2');
        });
    }

    if (btn3) {
        btn3.addEventListener('click', function () {
            Array.from(document.getElementsByClassName('view-3')).forEach(element => {
                element.classList.remove('view-3');
            });
            btn3.classList.add('view-3');
        });
    }

    if (hamburger) {
        hamburger.addEventListener('click', function () {
            Array.from(document.getElementsByClassName('navBar')).forEach(element => {
                element.classList.remove('navBar');
                element.classList.add('navBar-new');
            });
            Array.from(document.getElementsByClassName('nav-links')).forEach(element => {
                element.classList.remove('hidden');
            });
            hamburger.classList.add('hidden')
        });
    }
});
