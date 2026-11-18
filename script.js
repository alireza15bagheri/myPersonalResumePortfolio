// Required Elements for menuButton and the menu on smaller screens:
let isMenuOpen = false;
const headerEl = document.querySelector('header')
const menuButton = document.querySelector('#menu')

// Portfolio section 3D Card Effects:
function add3dEffectToPortfolioCards() {
    document.querySelectorAll('.portfolio .box-container .box').forEach(container => {
        // Resolve each card from its own box so the two collections cannot drift apart.
        const card = container.querySelector('.card');
        if (!card) return;

        container.addEventListener('mousemove', (event) => {
            // Read geometry per event: a cached rect goes stale after resize/breakpoint changes.
            const { width, height, left, top } = container.getBoundingClientRect();
            if (!width || !height) return;

            // offsetX/offsetY are relative to the event target (the img), not the box.
            // Viewport-based clientX/clientY minus the box origin gives the correct ratio.
            card.style.setProperty('--x-pos', ((event.clientX - left) / width) - 0.5);
            card.style.setProperty('--y-pos', ((event.clientY - top) / height) - 0.5);
        });

        container.addEventListener('mouseleave', () => {
            card.style.setProperty('--x-pos', 0);
            card.style.setProperty('--y-pos', 0);
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

    // Initialize effects
    typeWriter();
    add3dEffectToPortfolioCards();
});