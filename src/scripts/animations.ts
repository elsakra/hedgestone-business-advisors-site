import { animate, inView, stagger } from '@motionone/dom';

// Initialize animations when DOM is loaded
function initAnimations() {
  // Hero section animations
  const heroTitle = document.querySelector('.hero-title');
  const heroSubtitle = document.querySelector('.hero-subtitle');
  const heroCta = document.querySelector('.hero-cta');
  const heroImage = document.querySelector('.hero-image');

  if (heroTitle) {
    animate(heroTitle, { opacity: [0, 1], y: [30, 0] }, { duration: 0.8, delay: 0.2 });
  }
  if (heroSubtitle) {
    animate(heroSubtitle, { opacity: [0, 1], y: [20, 0] }, { duration: 0.8, delay: 0.4 });
  }
  if (heroCta) {
    animate(heroCta, { opacity: [0, 1], y: [20, 0] }, { duration: 0.8, delay: 0.6 });
  }
  if (heroImage) {
    animate(heroImage, { opacity: [0, 1], scale: [0.9, 1] }, { duration: 1, delay: 0.3 });
  }

  // Section reveal animations
  const sections = document.querySelectorAll<HTMLElement>('.animate-section');
  sections.forEach((section) => {
    inView(section, () => {
      animate(section, { opacity: [0, 1], y: [40, 0] }, { duration: 0.8 });
    }, { margin: '-100px' });
  });

  // Card stagger animations
  const cardGroups = document.querySelectorAll<HTMLElement>('.animate-cards');
  cardGroups.forEach((group) => {
    const cards = group.querySelectorAll<HTMLElement>('.card');
    inView(group, () => {
      animate(cards, { opacity: [0, 1], y: [30, 0] }, { 
        duration: 0.6, 
        delay: stagger(0.1) 
      });
    }, { margin: '-50px' });
  });

  // Navbar scroll effect
  const navbar = document.querySelector<HTMLElement>('.navbar');
  if (navbar) {
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 100) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
      
      lastScrollY = currentScrollY;
    });
  }

  // Button hover animations
  const buttons = document.querySelectorAll<HTMLElement>('.btn-primary, .btn-secondary');
  buttons.forEach((button) => {
    button.addEventListener('mouseenter', () => {
      animate(button, { scale: 1.05 }, { duration: 0.2 });
    });
    
    button.addEventListener('mouseleave', () => {
      animate(button, { scale: 1 }, { duration: 0.2 });
    });
  });

  // Floating animation for hero elements
  const floatingElements = document.querySelectorAll<HTMLElement>('.float-animation');
  floatingElements.forEach((element, index) => {
    animate(
      element,
      { y: [-10, 10, -10] },
      { 
        duration: 4 + index * 0.5, 
        repeat: Infinity, 
        easing: 'ease-in-out',
        delay: index * 0.2
      }
    );
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAnimations);
} else {
  initAnimations();
}

export {};