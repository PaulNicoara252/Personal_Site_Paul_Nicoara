/* -------------------------------------------------
   PAUL-NICOLAE NICOARĂ - PORTFOLIO LOGIC
   ------------------------------------------------- */

/* 1. ANIMATIA DE SCROLL (FACE PAGINA VIZIBILĂ) */
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));


/* 2. EFECTUL DE MASINA DE SCRIS (TYPEWRITER) */
const phrases = [
    "I build things that live on silicon.",
    "I design FPGA architectures.",
    "I bridge Hardware & Software.",
    "I code Embedded Systems."
];

const typeSpeed = 100;
const deleteSpeed = 50;
const pauseTime = 2000;

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const textElement = document.querySelector('.typewriter-text');

function typeEffect() {
    if (!textElement) return;

    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        textElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        textElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    let delta = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIndex === currentPhrase.length) {
        delta = pauseTime;
        isDeleting = true;
    }
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delta = 500;
    }

    setTimeout(typeEffect, delta);
}

document.addEventListener('DOMContentLoaded', typeEffect);


/* 3. ANIMATIA PENTRU SKILL BARS */
const skillsSection = document.getElementById('skills');
const progressBars = document.querySelectorAll('.progress-line span');

function showProgress() {
    progressBars.forEach(progressBar => {
        const value = progressBar.parentElement.getAttribute('data-width');
        progressBar.style.width = value;
    });
}

function hideProgress() {
    progressBars.forEach(p => {
        p.style.width = 0;
    });
}

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            showProgress();
        } else {
            hideProgress();
        }
    });
}, { threshold: 0.2 });

if(skillsSection) {
    skillsObserver.observe(skillsSection);
}


/* 4. PROIECT SLIDESHOW LOGIC */
let slideIndex = 0;
const slides = document.querySelectorAll('.project-slide');
const dots = document.querySelectorAll('.dot');

function showSlide(n) {
    if (n >= slides.length) slideIndex = 0;
    if (n < 0) slideIndex = slides.length - 1;

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active-dot'));

    slides[slideIndex].classList.add('active');
    dots[slideIndex].classList.add('active-dot');
}

function moveSlide(n) {
    showSlide(slideIndex += n);
}

function currentSlide(n) {
    showSlide(slideIndex = n);
}


/* 5. HOBBIES TABS (Lifestyle Section) */
const hobbiesData = [
    {
        title: "The Maker: 3D & Woodworking",
        desc: "I love bringing ideas into the physical world. Whether it's <strong>3D Modelling</strong> functional parts or practicing <strong>Woodworking</strong>, I enjoy the precision and patience required to build things with my hands. It complements my engineering mindset perfectly—turning abstract concepts into tangible reality.",
        img: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=2070&auto=format&fit=crop"
    },
    {
        title: "The Artist: Drawing & Music",
        desc: "Creativity feeds innovation. I express myself through <strong>Drawing</strong> (sketching whatever catches my eye), <strong>Photography</strong>, and playing the <strong>Guitar</strong>. These artistic outlets keep my mind flexible and help me approach technical problems from fresh, unconventional angles.",
        img: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=2070&auto=format&fit=crop"
    },
    {
        title: "The Explorer: Nature & Drive",
        desc: "Disconnecting is essential. I stay active through <strong>Hiking</strong> in the Carpathians, <strong>Bicycling</strong>, and hitting the <strong>Gym</strong>. I'm also passionate about <strong>Driving</strong>—there's something meditative about the road that clears my mind and recharges my energy.",
        img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop"
    },
    {
        title: "The Thinker: History & Strategy",
        desc: "Curiosity never sleeps. I am deeply interested in <strong>Learning History</strong> to understand how the world evolved. I also enjoy <strong>Reading</strong> and playing <strong>Strategy Video Games</strong>, which act as a mental gym for resource management and long-term planning.",
        img: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1973&auto=format&fit=crop"
    }
];

function changeHobby(index) {
    const buttons = document.querySelectorAll('.hobby-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    buttons[index].classList.add('active');

    const title = document.getElementById('hobby-title');
    const desc = document.getElementById('hobby-desc');
    const img = document.getElementById('hobby-img');
    const display = document.getElementById('hobby-content');

    display.style.animation = 'none';
    display.offsetHeight; /* trigger reflow */
    display.style.animation = 'fadeIn 0.5s ease-in-out';

    title.innerHTML = hobbiesData[index].title;
    desc.innerHTML = hobbiesData[index].desc;
    img.src = hobbiesData[index].img;
}


/* 6. BACK TO TOP LOGIC */
const scrollBtn = document.getElementById("scrollTopBtn");

window.onscroll = function() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        scrollBtn.style.display = "block";
    } else {
        scrollBtn.style.display = "none";
    }
};

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


/* 7. MOBILE MENU TOGGLE */
function toggleMenu() {
    const nav = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger i');

    nav.classList.toggle('active');

    if (nav.classList.contains('active')) {
        hamburger.classList.remove('fa-bars');
        hamburger.classList.add('fa-times');
    } else {
        hamburger.classList.remove('fa-times');
        hamburger.classList.add('fa-bars');
    }
}