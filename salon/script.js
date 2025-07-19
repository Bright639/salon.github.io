/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== ACCORDION SKILLS ===============*/
const skillsContent = document.getElementsByClassName('skills__content'),
      skillsHeader = document.querySelectorAll('.skills__header')

function toggleSkills(){
    let itemClass = this.parentNode.className

    for(i = 0; i < skillsContent.length; i++){
        skillsContent[i].className = 'skills__content skills__close'
    }
    if(itemClass === 'skills__content skills__close'){
        this.parentNode.className = 'skills__content skills__open'
    }
}

skillsHeader.forEach((el) =>{
    el.addEventListener('click', toggleSkills)
})

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== CHANGE BACKGROUND HEADER ===============*/ 
function scrollHeader(){
    const nav = document.getElementById('header')
    // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== SHOW SCROLL UP ===============*/ 
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SMOOTH SCROLLING ===============*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/*=============== CONTACT FORM VALIDATION ===============*/
const contactForm = document.getElementById('contact-form');
const contactName = document.getElementById('contact-name');
const contactEmail = document.getElementById('contact-email');
const contactMessage = document.getElementById('contact-message');
const contactResult = document.getElementById('contact-message-result');

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Form validation
function validateForm() {
    let isValid = true;
    let errorMessage = '';

    // Clear previous styles
    clearValidationStyles();

    // Validate name
    if (contactName.value.trim() === '') {
        isValid = false;
        errorMessage += 'Name is required. ';
        contactName.style.borderColor = '#d63031';
    }

    // Validate email
    if (contactEmail.value.trim() === '') {
        isValid = false;
        errorMessage += 'Email is required. ';
        contactEmail.style.borderColor = '#d63031';
    } else if (!emailRegex.test(contactEmail.value.trim())) {
        isValid = false;
        errorMessage += 'Please enter a valid email address. ';
        contactEmail.style.borderColor = '#d63031';
    }

    // Validate message
    if (contactMessage.value.trim() === '') {
        isValid = false;
        errorMessage += 'Message is required. ';
        contactMessage.style.borderColor = '#d63031';
    }

    return { isValid, errorMessage };
}

function clearValidationStyles() {
    contactName.style.borderColor = '';
    contactEmail.style.borderColor = '';
    contactMessage.style.borderColor = '';
}

function showMessage(message, isSuccess) {
    contactResult.textContent = message;
    contactResult.className = `contact__message ${isSuccess ? 'success' : 'error'}`;
    contactResult.style.display = 'block';
    
    // Hide message after 5 seconds
    setTimeout(() => {
        contactResult.style.display = 'none';
    }, 5000);
}

// Form submission
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const validation = validateForm();
    
    if (validation.isValid) {
        // Simulate form submission
        showMessage('Message sent successfully! Thank you for contacting me.', true);
        
        // Clear form
        contactForm.reset();
        clearValidationStyles();
    } else {
        showMessage(validation.errorMessage.trim(), false);
    }
});

/*=============== FADE IN ANIMATION ON SCROLL ===============*/
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections and cards
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.section, .project__card, .skills__content, .contact__card');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
});

/*=============== TYPING EFFECT ===============*/
const typingText = document.querySelector('.home__title');
if (typingText) {
    const originalText = typingText.textContent;
    typingText.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            typingText.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing effect after page loads
    setTimeout(typeWriter, 1000);
}

/*=============== NAVBAR CONTAINER ===============*/
document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('.nav');
    const container = document.createElement('div');
    container.className = 'nav__container container';
    
    // Move all nav content into the container
    while (nav.firstChild) {
        container.appendChild(nav.firstChild);
    }
    
    nav.appendChild(container);
});

/*=============== DYNAMIC YEAR IN FOOTER ===============*/
document.addEventListener('DOMContentLoaded', function() {
    const footerCopy = document.querySelector('.footer__copy');
    if (footerCopy) {
        const currentYear = new Date().getFullYear();
        footerCopy.innerHTML = `&#169; ${currentYear} Alex Chen. All rights reserved`;
    }
});

/*=============== PRELOADER ===============*/
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

/*=============== DARK THEME ===============*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  if (themeButton) {
    themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
  }
}

// Activate / deactivate the theme manually with the button
if (themeButton) {
    themeButton.addEventListener('click', () => {
        // Add or remove the dark / icon theme
        document.body.classList.toggle(darkTheme)
        themeButton.classList.toggle(iconTheme)
        // We save the theme and the current icon that the user chose
        localStorage.setItem('selected-theme', getCurrentTheme())
        localStorage.setItem('selected-icon', getCurrentIcon())
    })
}