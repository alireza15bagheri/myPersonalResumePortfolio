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

function add3dEffectToPortfolioCards() {
    containers.forEach((container, i) => {
        const { width, height } = container.getBoundingClientRect();
        
        container.addEventListener('mousemove', (event) => {
            const { offsetX, offsetY } = event;
            card[i].style.setProperty('--x-pos', (offsetX / width) - 0.5);
            card[i].style.setProperty('--y-pos', (offsetY / height) - 0.5);
        });

        container.addEventListener('mouseleave', () => {
            card[i].style.setProperty('--x-pos', 0);
            card[i].style.setProperty('--y-pos', 0);
        });
    });
}

// Toggle Header visibility On small screens function
function openCloseMenu() {
    isMenuOpen = !isMenuOpen;
    headerEl.classList.toggle('toggle')
    menuButton.setAttribute('aria-expanded', isMenuOpen);

    if (isMenuOpen) {
        menuButton.classList.add("open")
    } else {
        menuButton.classList.remove("open")
    }
}

menuButton.addEventListener("click", openCloseMenu)

// TypeWriter Text Effect on the home section:
function typeWriter() {
    const elements = document.getElementsByClassName('typewrite');
    
    for (const el of elements) {
        const toRotate = JSON.parse(el.getAttribute('data-type'));
        const period = parseInt(el.getAttribute('data-period'), 10) || 2000;
        
        let loopNum = 0;
        let txt = '';
        let isDeleting = false;
        const wrap = document.createElement('span');
        wrap.className = 'wrap';
        el.innerHTML = '';
        el.appendChild(wrap);
        
        function tick() {
            const i = loopNum % toRotate.length;
            const fullTxt = toRotate[i];
            
            if (isDeleting) {
                txt = fullTxt.substring(0, txt.length - 1);
            } else {
                txt = fullTxt.substring(0, txt.length + 1);
            }
            
            wrap.textContent = txt;
            
            let delta = 200 - Math.random() * 100;
            if (isDeleting) delta /= 2;
            
            if (!isDeleting && txt === fullTxt) {
                delta = period;
                isDeleting = true;
            } else if (isDeleting && txt === '') {
                isDeleting = false;
                loopNum++;
                delta = 500;
            }
            
            setTimeout(tick, delta);
        }
        tick();
    }
}

// Debounce utility
function debounce(fn, delay) {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    };
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    const goToTopIcon = document.querySelector('.top');

    // Scroll handler with debounce
    window.addEventListener('scroll', debounce(() => {
        headerEl.classList.remove('toggle');
        menuButton.classList.remove("open");
        menuButton.setAttribute('aria-expanded', 'false');
        isMenuOpen = false;

        if (window.scrollY > 200) {
            goToTopIcon.style.display = 'block';
        } else {
            goToTopIcon.style.display = 'none';
        }
    }, 100));

    // Smooth Scrolling - native
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            // Close mobile menu on link click
            if (isMenuOpen) {
                openCloseMenu();
            }
        });
    });

    // Form validation
    form.addEventListener('submit', (e) => {
        const isValid = form_name.value.trim() && 
                        form_email.value.trim() && 
                        form_message.value.trim();
        
        form_warning.hidden = isValid;
        if (!isValid) e.preventDefault();
    });

    // Clear form on load
    form_name.value = '';
    form_email.value = '';
    form_message.value = '';

    // Initialize effects
    typeWriter();
    add3dEffectToPortfolioCards();
});