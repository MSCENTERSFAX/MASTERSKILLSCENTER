// ================================
// JavaScript INTERACTIF
// ================================

// Menu hamburger
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    hamburger.classList.toggle('active');
});

// Fermer le menu au clic sur un lien
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.style.display = 'none';
        hamburger.classList.remove('active');
    });
});

// Animation de défilement fluide pour les sections
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

// Formulaire de contact
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        // Récupérer les valeurs du formulaire
        const nom = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const telephone = this.querySelector('input[type="tel"]').value;
        const message = this.querySelector('textarea').value;
        
        // Validation simple
        if (nom && email && telephone && message) {
            // Afficher un message de succès
            alert('Merci! Votre message a été envoyé avec succès.\nNous vous répondrons bientôt.');
            
            // Réinitialiser le formulaire
            this.reset();
        } else {
            alert('Veuillez remplir tous les champs du formulaire.');
        }
    });
}

// Animation au défilement (Intersection Observer)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer les cartes de formation
document.querySelectorAll('.formation-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// Observer les cartes statistiques
document.querySelectorAll('.stat-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// Effet de compteur pour les statistiques
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.textContent.includes('/') ? '/5' : element.textContent.match(/[^\d]/g).join(''));
            clearInterval(timer);
        } else {
            element.textContent = Math.ceil(current) + (element.textContent.includes('/') ? '/5' : element.textContent.match(/[^\d]/g).join(''));
        }
    }, 16);
}

// Activer l'animation des compteurs au défilement
const statElements = document.querySelectorAll('.stat-card h4');
let statsAnimated = false;

const statsObserver = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            statsAnimated = true;
            
            // Animer les compteurs
            animateCounter(statElements[0], 500);  // 500+ apprenants
            animateCounter(statElements[1], 50);   // 50+ formations
            // Les autres restent statiques (4.8/5 et 100%)
            
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observer la première stat card
if (document.querySelector('.stat-card')) {
    statsObserver.observe(document.querySelector('.stat-card'));
}

// Navbar sticky - changement de style
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = 'var(--shadow)';
    }
});

// Gestion du menu mobile - ajuster le style du hamburger
const navLinksMobile = document.querySelector('.nav-links');

if (navLinksMobile) {
    // Style pour afficher/masquer le menu mobile
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .nav-links {
                position: fixed;
                left: 0;
                top: 70px;
                width: 100%;
                background-color: var(--white);
                flex-direction: column;
                padding: 2rem;
                gap: 1rem;
                box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
            }
            
            .hamburger.active span:nth-child(1) {
                transform: rotate(45deg) translate(10px, 10px);
            }
            
            .hamburger.active span:nth-child(2) {
                opacity: 0;
            }
            
            .hamburger.active span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -7px);
            }
        }
    `;
    document.head.appendChild(style);
}

// Message de bienvenue dans la console
console.log('%cBienvenue sur Master Skills Centre!', 'color: #1E5BA8; font-size: 20px; font-weight: bold;');
console.log('%cCentre de Formation Professionnel', 'color: #F39C12; font-size: 14px;');
