// Required Elements for menuButton and the menu on smaller screens:
let isMenuOpen = false;
const headerEl = document.querySelector('header')
const menuButton = document.querySelector('#menu')
const form = document.querySelector('form')
// Form inputs:
const form_name = document.getElementById('form_name')
const form_email = document.getElementById('form_email')
const form_message = document.getElementById('form_message')
const form_warning = document.querySelector('.form-not-valid')

// Required Elements for portfolio section 3D Card Effects:
const containers = document.querySelectorAll('.portfolio .box-container .box');
const card = document.querySelectorAll('.card');
const { width, height } = containers[1].getBoundingClientRect();

function add3dEffectToPortfolioCards() {

    for (let item of containers.entries()) {

        item[1].addEventListener('mousemove', (event) => {
            const { offsetX, offsetY } = event;

            card[item[0]].style.setProperty('--x-pos', (offsetX / width) - 0.5);
            card[item[0]].style.setProperty('--y-pos', (offsetY / width) - 0.5);
        })

    }

}


// Toggle Header visibility On small screens function
function openCloseMenu() {
    isMenuOpen = !isMenuOpen;
    headerEl.classList.toggle('toggle')

    if (isMenuOpen) {
        menuButton.classList.add("open")
    } else {
        menuButton.classList.remove("open")
    }
}

menuButton.addEventListener("click", openCloseMenu)

// TypeWriter Text Effect on the home section:
function typeWriter() {

    let TxtType = function (el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function () {
        let i = this.loopNum % this.toRotate.length;
        let fullTxt = this.toRotate[i];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

        let that = this;
        let delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }

        setTimeout(function () {
            that.tick();
        }, delta);

    };

    window.onload = function () {
        let elements = document.getElementsByClassName('typewrite');
        for (let i = 0; i < elements.length; i++) {
            let toRotate = elements[i].getAttribute('data-type');
            let period = elements[i].getAttribute('data-period');
            if (toRotate) {
                new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }

        form_name.value = ''
        form_email.value = ''
        form_message.value = ''

    };

}


$(document).ready(function () {

    const goToTopIcon = document.querySelector('.top')

    $(window).on('scroll load', function () {

        headerEl.classList.remove('toggle')
        menuButton.classList.remove("open");
        isMenuOpen = false;


        if (window.scrollY > 200) {
            goToTopIcon.style.display = 'block';
        } else {
            goToTopIcon.style.display = 'none';
        }
    });

    // Smooth Scrolling using JQuery:
    $('a[href*="#"]').on('click', function (e) {

        e.preventDefault();

        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        },
            500,
            'linear'
        );

    });

});



// object Event Listeners:


form.addEventListener('submit', (e) => {
    if (form_name.value === '' || form_email.value === '' || form_name.value === '') {
        form_warning.hidden = false;
        e.preventDefault()
    } else {
        form_warning.hidden = true;
    }

})



// onLoad:

typeWriter();
add3dEffectToPortfolioCards();
