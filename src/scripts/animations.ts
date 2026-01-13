import { animate, stagger, inView } from '@motionone/dom';

// Wait for DOM to be ready
function ready(fn: () => void) {
  if (document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(() => {
  // Animate elements on scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll<HTMLElement>('.animate-fade-in');
    
    elements.forEach((element) => {
      inView(element, () => {
        element.classList.add('visible');
        
        // Add staggered animation for child elements
        const staggerElements = element.querySelectorAll<HTMLElement>('[class*="animate-stagger"]');
        if (staggerElements.length > 0) {
          animate(
            staggerElements,
            { opacity: [0, 1], transform: ['translateY(20px)', 'translateY(0px)'] },
            { delay: stagger(0.1), duration: 0.6, easing: 'ease-out' }
          );
        }
      });
    });
  };
  
  // Navbar scroll effect
  const navbar = document.querySelector<HTMLElement>('header');
  if (navbar) {
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 100) {
        navbar.style.backgroundColor = 'rgba(17, 24, 39, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
      } else {
        navbar.style.backgroundColor = 'rgba(17, 24, 39, 0.95)';
        navbar.style.backdropFilter = 'blur(4px)';
      }
      
      // Hide/show navbar on scroll
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        navbar.style.transform = 'translateY(-100%)';
      } else {
        navbar.style.transform = 'translateY(0)';
      }
      
      lastScrollY = currentScrollY;
    });
  }
  
  // Smooth scroll for anchor links
  const anchorLinks = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href')?.substring(1);
      const targetElement = targetId ? document.getElementById(targetId) : null;
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Card hover animations
  const cards = document.querySelectorAll<HTMLElement>('.group');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      animate(
        card,
        { transform: 'translateY(-8px)', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)' },
        { duration: 0.3, easing: 'ease-out' }
      );
    });
    
    card.addEventListener('mouseleave', () => {
      animate(
        card,
        { transform: 'translateY(0px)', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' },
        { duration: 0.3, easing: 'ease-out' }
      );
    });
  });
  
  // Button hover effects
  const buttons = document.querySelectorAll<HTMLElement>('.btn-primary, .btn-secondary');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      const icon = button.querySelector<HTMLElement>('svg');
      if (icon) {
        animate(
          icon,
          { transform: 'translateX(4px)' },
          { duration: 0.2, easing: 'ease-out' }
        );
      }
    });
    
    button.addEventListener('mouseleave', () => {
      const icon = button.querySelector<HTMLElement>('svg');
      if (icon) {
        animate(
          icon,
          { transform: 'translateX(0px)' },
          { duration: 0.2, easing: 'ease-out' }
        );
      }
    });
  });
  
  // Initialize animations
  animateOnScroll();
  
  // Parallax effect for hero background elements
  const parallaxElements = document.querySelectorAll<HTMLElement>('[class*="blur-3xl"]');
  if (parallaxElements.length > 0) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      
      parallaxElements.forEach((element, index) => {
        const speed = (index + 1) * 0.3;
        element.style.transform = `translateY(${rate * speed}px)`;
      });
    });
  }
  
  // Form focus animations
  const formInputs = document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>('input, textarea, select');
  formInputs.forEach(input => {
    input.addEventListener('focus', () => {
      animate(
        input,
        { transform: 'scale(1.02)' },
        { duration: 0.2, easing: 'ease-out' }
      );
    });
    
    input.addEventListener('blur', () => {
      animate(
        input,
        { transform: 'scale(1)' },
        { duration: 0.2, easing: 'ease-out' }
      );
    });
  });
});