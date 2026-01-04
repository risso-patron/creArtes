// ===== MOBILE NAVIGATION =====
// Mobile Navigation Toggle
const navToggle = document.getElementById("navToggle")
const navMenu = document.getElementById("navMenu")

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active")
  navToggle.classList.toggle("active")
})

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll(".nav-link")
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
    navToggle.classList.remove("active")
  })
})

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Header scroll effect
let lastScroll = 0
const header = document.querySelector(".header")

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset

  // Sticky transparent effect
  if (currentScroll > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  lastScroll = currentScroll
})

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item')

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question')
  
  question.addEventListener('click', () => {
    // Close all other items
    faqItems.forEach(otherItem => {
      if (otherItem !== item) {
        otherItem.classList.remove('active')
      }
    })
    
    // Toggle current item
    item.classList.toggle('active')
  })
})

// Form Validation and Submission
const contactForm = document.getElementById("contactForm")
const formSuccess = document.getElementById("formSuccess")

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    // Anti-spam honeypot: si el campo "website" está lleno, es un bot
    const honeypot = document.getElementById("website");
    if (honeypot && honeypot.value !== "") {
      // Silenciosamente ignorar el envío (no alertar al bot)
      return false;
    }

    // Get form data
    const formData = {
      nombre: document.getElementById("nombre").value,
      email: document.getElementById("email").value,
      telefono: document.getElementById("telefono").value,
      empresa: document.getElementById("empresa").value,
      servicio: document.getElementById("servicio").value,
      mensaje: document.getElementById("mensaje").value,
    }

    // Basic validation
    if (!formData.nombre || !formData.email || !formData.telefono || !formData.servicio || !formData.mensaje) {
      alert("Por favor completa todos los campos obligatorios.")
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      alert("Por favor ingresa un correo electrónico válido.")
      return
    }

    // Log form data (in production, this would be sent to a server)
    console.log("Form submitted with data:", formData)

    // Show success message
    contactForm.style.display = "none"
    formSuccess.style.display = "block"

    // Create WhatsApp message
    const whatsappMessage = `Hola! Me gustaría solicitar información sobre ${formData.servicio}.

*Datos de contacto:*
• Nombre: ${formData.nombre}
• Email: ${formData.email}
• Teléfono: ${formData.telefono}
${formData.empresa ? `• Empresa: ${formData.empresa}` : ''}

*Mensaje:*
${formData.mensaje}

¡Espero su respuesta!`

    const whatsappUrl = `https://wa.me/50769347097?text=${encodeURIComponent(whatsappMessage)}`

    // Auto-redirect to WhatsApp after 2 seconds
    setTimeout(() => {
      window.open(whatsappUrl, '_blank')
    }, 2000)
  })
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate")
      
      // Animate numbers if they're stat numbers
      if (entry.target.classList.contains('numero')) {
        animateCounter(entry.target)
      }
    }
  })
}, observerOptions)

// Observe all sections for animations
document.querySelectorAll("section").forEach((section) => {
  observer.observe(section)
})

// Observe stat numbers
document.querySelectorAll(".numero").forEach((numero) => {
  observer.observe(numero)
})

// Counter animation function
function animateCounter(element) {
  const target = parseInt(element.textContent.replace(/[+%]/g, ""))
  const suffix = element.textContent.includes('+') ? '+' : element.textContent.includes('%') ? '%' : ''
  let current = 0
  const increment = target / 50
  const timer = setInterval(() => {
    current += increment
    if (current >= target) {
      element.textContent = target + suffix
      clearInterval(timer)
    } else {
      element.textContent = Math.round(current) + suffix
    }
  }, 40)
}

// Service card hover effects
const serviceCards = document.querySelectorAll('.servicio-card')
serviceCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-8px) scale(1.02)'
  })
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) scale(1)'
  })
})

// Logo loading animation
window.addEventListener("load", () => {
  const logo = document.querySelector(".logo")
  if (logo) {
    logo.style.opacity = "1"
    logo.style.transform = "scale(1)"
  }
  
  // Animate hero stats on load
  const heroStats = document.querySelectorAll(".stat-number")
  heroStats.forEach(stat => {
    setTimeout(() => {
      animateCounter(stat)
    }, 1000)
  })
})

// Scroll to top when clicking logo
const logo = document.querySelector('.nav-logo')
if (logo) {
  logo.addEventListener('click', (e) => {
    e.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  })
}

// Add loading state to form button
if (contactForm) {
  const submitBtn = contactForm.querySelector('button[type="submit"]')
  contactForm.addEventListener('submit', () => {
    submitBtn.innerHTML = 'Enviando...'
    submitBtn.disabled = true
    
    setTimeout(() => {
      submitBtn.innerHTML = 'Enviar Consulta'
      submitBtn.disabled = false
    }, 3000)
  })
}

// Parallax effect for hero section (optimized with requestAnimationFrame)
let parallaxTicking = false;

window.addEventListener("scroll", () => {
  if (!parallaxTicking) {
    window.requestAnimationFrame(() => {
      const scrolled = window.pageYOffset;
      const hero = document.querySelector(".hero");
      
      if (hero && scrolled < hero.offsetHeight) {
        const speed = scrolled * 0.5;
        hero.style.transform = `translateY(${speed}px)`;
      }
      
      parallaxTicking = false;
    });
    
    parallaxTicking = true;
  }
})

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', function(e) {
    let ripple = document.createElement('span')
    ripple.classList.add('ripple')
    this.appendChild(ripple)
    
    let x = e.clientX - e.target.offsetLeft
    let y = e.clientY - e.target.offsetTop
    
    ripple.style.left = `${x}px`
    ripple.style.top = `${y}px`
    
    setTimeout(() => {
      ripple.remove()
    }, 600)
  })
})

// Add CSS for ripple effect
const style = document.createElement('style')
style.textContent = `
  .btn {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple 600ms linear;
    pointer-events: none;
  }
  
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`
document.head.appendChild(style)

// Intersection Observer for card fade-ins
const elementObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe all cards and sections
document
  .querySelectorAll(".servicio-card, .about-card, .showcase-item, .signature-card, .benefit-card, .testimonial-card")
  .forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    elementObserver.observe(el)
  })

// Portfolio hover effect enhancement
const portfolioItems = document.querySelectorAll(".showcase-item")
portfolioItems.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    // Hover effect handled by CSS
  })
})

// Track CTA button clicks
const ctaButtons = document.querySelectorAll(".btn-primary")
ctaButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Click tracking can be added here for analytics
  })
})

// ===== LIGHTBOX GALLERY =====
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxTag = document.getElementById('lightboxTag');
const lightboxDescription = document.getElementById('lightboxDescription');
const lightboxCounter = document.getElementById('lightboxCounter');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

// Get all showcase images
const showcaseImages = document.querySelectorAll('.showcase-image');
let currentImageIndex = 0;

// Open lightbox
function openLightbox(index) {
  currentImageIndex = index;
  updateLightboxContent();
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden'; // Prevent scroll
}

// Close lightbox
function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = ''; // Restore scroll
}

// Update lightbox content
function updateLightboxContent() {
  const img = showcaseImages[currentImageIndex];
  
  lightboxImage.src = img.src;
  lightboxImage.alt = img.alt;
  lightboxTitle.textContent = img.dataset.title || img.alt;
  lightboxTag.textContent = img.dataset.tag || '';
  lightboxDescription.textContent = img.dataset.description || '';
  lightboxCounter.textContent = `${currentImageIndex + 1} / ${showcaseImages.length}`;
  
  // Add fade animation
  lightboxImage.style.animation = 'none';
  setTimeout(() => {
    lightboxImage.style.animation = 'lightboxZoomIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
  }, 10);
}

// Navigate to previous image
function showPrevImage() {
  currentImageIndex = (currentImageIndex - 1 + showcaseImages.length) % showcaseImages.length;
  updateLightboxContent();
}

// Navigate to next image
function showNextImage() {
  currentImageIndex = (currentImageIndex + 1) % showcaseImages.length;
  updateLightboxContent();
}

// Add click event to all showcase images
showcaseImages.forEach((img, index) => {
  img.addEventListener('click', () => openLightbox(index));
  img.style.cursor = 'pointer';
});

// Close button
lightboxClose.addEventListener('click', closeLightbox);

// Navigation buttons
lightboxPrev.addEventListener('click', showPrevImage);
lightboxNext.addEventListener('click', showNextImage);

// Close on background click
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  
  switch(e.key) {
    case 'Escape':
      closeLightbox();
      break;
    case 'ArrowLeft':
      showPrevImage();
      break;
    case 'ArrowRight':
      showNextImage();
      break;
  }
});

// Prevent image drag
lightboxImage.addEventListener('dragstart', (e) => e.preventDefault());

// ===== PARALLAX SCROLL EFFECT =====
const heroSection = document.querySelector('.hero');
const heroBgParallax = document.querySelector('.hero-bg-parallax');

if (heroSection && heroBgParallax) {
  let ticking = false;
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        const heroHeight = heroSection.offsetHeight;
        
        // Solo aplicar parallax mientras el hero es visible
        if (scrolled < heroHeight) {
          const parallaxSpeed = 0.5; // Velocidad del parallax (0.5 = mitad de velocidad)
          const yPos = scrolled * parallaxSpeed;
          heroBgParallax.style.transform = `translateY(${yPos}px)`;
        }
        
        ticking = false;
      });
      
      ticking = true;
    }
  });
}

// ===== FADE-IN SCROLL ANIMATIONS =====
const fadeElements = document.querySelectorAll('.fade-in');

if (fadeElements.length > 0) {
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Opcional: dejar de observar una vez animado
        fadeObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  fadeElements.forEach(element => {
    fadeObserver.observe(element);
  });
}

// ==========================================
// BACK TO TOP BUTTON
// ==========================================
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  
  if (!backToTopBtn) return;

  // Show/hide button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  // Scroll to top with smooth behavior
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ==========================================
// INITIALIZE ALL FUNCTIONS
// ==========================================
// Call back to top function
initBackToTop();
