// ===== PARTICLE WAVE — HERO BACKGROUND =====
;(function () {
  const canvas = document.getElementById('particleCanvas')
  if (!canvas) return

  const ctx = canvas.getContext('2d')

  // Configuración
  const COUNT      = 480    // partículas totales
  const REPEL_R    = 160    // radio de repulsión del cursor
  const REPEL_F    = 8      // fuerza del empuje
  const FRICTION   = 0.86   // amortiguación
  const SPRING     = 0.038  // fuerza de retorno a posición base (ola)
  const WAVE_AMP   = 48     // amplitud de la ola en px
  const WAVE_FREQ  = 0.007  // frecuencia espacial de la ola
  const WAVE_SPEED = 0.85   // velocidad de avance de la ola
  const COLOR      = 'rgba(7,153,140,'

  let W, H, particles, time = 0
  let mouse = { x: -9999, y: -9999 }

  function resize() {
    const s = canvas.closest('section')
    W = canvas.width  = s ? s.offsetWidth  : window.innerWidth
    H = canvas.height = s ? s.offsetHeight : window.innerHeight
  }

  function Particle() {
    // Distribución inicial uniforme
    this.baseX = Math.random() * W
    this.baseY = Math.random() * H
    this.x  = this.baseX
    this.y  = this.baseY
    this.vx = 0
    this.vy = 0
    // Fase individual — cada partícula está en punto distinto de la ola
    this.phase = Math.random() * Math.PI * 2
    // Amplitud personal: variación natural en la intensidad de la ola
    this.amp  = WAVE_AMP * (Math.random() * 0.6 + 0.7)
    // Visual
    this.w = Math.random() * 5 + 2
    this.h = Math.random() * 1.4 + 0.7
    this.a = Math.random() * 0.28 + 0.18
  }

  Particle.prototype.update = function () {
    // Posición objetivo según ola senoidal bidireccional
    // Ola horizontal (ondula en Y según posición X del base)
    const waveY = Math.sin(this.baseX * WAVE_FREQ + time * WAVE_SPEED + this.phase) * this.amp
    // Ola vertical secundaria más suave (profundidad)
    const waveX = Math.cos(this.baseY * WAVE_FREQ * 0.8 + time * WAVE_SPEED * 0.65 + this.phase) * this.amp * 0.4

    const targetX = this.baseX + waveX
    const targetY = this.baseY + waveY

    // Spring — atrae suavemente hacia la posición ondulatoria
    this.vx += (targetX - this.x) * SPRING
    this.vy += (targetY - this.y) * SPRING

    // Repulsión del cursor
    const dx   = this.x - mouse.x
    const dy   = this.y - mouse.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist < REPEL_R && dist > 0.5) {
      const str = (REPEL_R - dist) / REPEL_R
      this.vx += (dx / dist) * str * REPEL_F
      this.vy += (dy / dist) * str * REPEL_F
    }

    // Fricción
    this.vx *= FRICTION
    this.vy *= FRICTION

    this.x += this.vx
    this.y += this.vy
  }

  Particle.prototype.draw = function () {
    const angle = Math.atan2(this.vy, this.vx)
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(angle)
    ctx.beginPath()
    ctx.ellipse(0, 0, this.w / 2, this.h / 2, 0, 0, Math.PI * 2)
    ctx.fillStyle = COLOR + this.a + ')'
    ctx.fill()
    ctx.restore()
  }

  function init() {
    resize()
    particles = Array.from({ length: COUNT }, () => new Particle())
  }

  function drawFrame() {
    time += 0.018   // velocidad de avance de la ola
    ctx.clearRect(0, 0, W, H)
    for (let i = 0; i < particles.length; i++) {
      particles[i].update()
      particles[i].draw()
    }
    requestAnimationFrame(drawFrame)
  }

  window.addEventListener('resize', () => {
    resize()
    // Recalcular bases proporcionales al nuevo tamaño
    particles.forEach(p => {
      p.baseX = Math.random() * W
      p.baseY = Math.random() * H
      p.x = p.baseX
      p.y = p.baseY
      p.vx = 0; p.vy = 0
    })
  })

  const section = canvas.closest('section')
  if (section) {
    section.addEventListener('mousemove', e => {
      const rect = section.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    })
    section.addEventListener('mouseleave', () => {
      mouse.x = -9999; mouse.y = -9999
    })
    section.addEventListener('touchmove', e => {
      const rect = section.getBoundingClientRect()
      mouse.x = e.touches[0].clientX - rect.left
      mouse.y = e.touches[0].clientY - rect.top
    }, { passive: true })
    section.addEventListener('touchend', () => {
      mouse.x = -9999; mouse.y = -9999
    })
  }

  if (document.readyState === 'complete') {
    init(); drawFrame()
  } else {
    window.addEventListener('load', () => { init(); drawFrame() })
  }
})()



// ===== HERO VIDEO CONTROL =====
// Control video playback speed for smoother motion
const heroVideo = document.getElementById("heroVideo")
if (heroVideo) {
  // Set playback rate — 0.9 = 10% más lento
  heroVideo.playbackRate = 0.9
  
  // Ensure video plays after load
  heroVideo.addEventListener("loadeddata", () => {
    heroVideo.play().catch(err => console.log("Video autoplay prevented:", err))
  })
}

// ===== SCROLL INDICATOR HIDE =====
// Hide scroll indicator when user scrolls down
const scrollIndicator = document.querySelector(".scroll-indicator")
if (scrollIndicator) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      scrollIndicator.classList.add("hidden")
    } else {
      scrollIndicator.classList.remove("hidden")
    }
  })
}

// ===== SERVICIOS TABS SYSTEM =====
// Tab switching functionality for services section
window.addEventListener('load', function() {
  const servicioTabs = document.querySelectorAll(".servicio-tab")
  const servicioPanels = document.querySelectorAll(".servicio-panel")

  servicioTabs.forEach(function(tab) {
    tab.addEventListener("click", function() {
      const targetId = tab.getAttribute("data-servicio")
      
      // Remove active class from all tabs and panels
      servicioTabs.forEach(function(t) {
        t.classList.remove("active")
      })
      servicioPanels.forEach(function(p) {
        p.classList.remove("active")
      })
      
      // Add active class to clicked tab
      tab.classList.add("active")
      
      // Show corresponding panel
      const targetPanel = document.getElementById(targetId)
      if (targetPanel) {
        targetPanel.classList.add("active")
      }
    })
  })
})

// ===== PORTFOLIO FILTERS =====
// Filter functionality for portfolio projects
window.addEventListener('load', function() {
  const filterBtns = document.querySelectorAll('.filter-btn')
  const projectCards = document.querySelectorAll('.project-card')

  if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        const filter = btn.getAttribute('data-filter')
        
        // Update active button
        filterBtns.forEach(function(b) {
          b.classList.remove('active')
        })
        btn.classList.add('active')
        
        // Filter projects
        projectCards.forEach(function(card) {
          const category = card.getAttribute('data-category')
          
          if (filter === 'todos' || category === filter) {
            card.style.display = 'block'
            setTimeout(function() {
              card.style.opacity = '1'
              card.style.transform = 'translateY(0)'
            }, 10)
          } else {
            card.style.opacity = '0'
            card.style.transform = 'translateY(20px)'
            setTimeout(function() {
              card.style.display = 'none'
            }, 300)
          }
        })
      })
    })
  }
})

// ===== MOBILE NAVIGATION =====
// Mobile Navigation Toggle
const navToggle = document.getElementById("navToggle")
const navMenu = document.getElementById("navMenu")

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active")
    navToggle.classList.toggle("active")
  })
}

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
      nombre: document.getElementById("name").value,
      email: document.getElementById("email").value,
      telefono: document.getElementById("phone").value,
      empresa: document.getElementById("company").value,
      servicio: document.getElementById("service").value,
      mensaje: document.getElementById("message").value,
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

    // Show success message
    contactForm.classList.add("hidden")
    formSuccess.classList.remove("hidden")

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
    submitBtn.textContent = 'Enviando...'
    submitBtn.disabled = true
    
    setTimeout(() => {
      submitBtn.textContent = 'Enviar Consulta'
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
const showcaseImages = document.querySelectorAll('.showcase-image')

// Only initialize lightbox if elements exist
if (lightbox && lightboxClose && showcaseImages.length > 0) {
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
    
    if (lightboxImage) lightboxImage.src = img.src;
    if (lightboxImage) lightboxImage.alt = img.alt;
    if (lightboxTitle) lightboxTitle.textContent = img.dataset.title || img.alt;
    if (lightboxTag) lightboxTag.textContent = img.dataset.tag || '';
    if (lightboxDescription) lightboxDescription.textContent = img.dataset.description || '';
    if (lightboxCounter) lightboxCounter.textContent = `${currentImageIndex + 1} / ${showcaseImages.length}`;
    
    // Add fade animation
    if (lightboxImage) {
      lightboxImage.style.animation = 'none';
      setTimeout(() => {
        lightboxImage.style.animation = 'lightboxZoomIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
      }, 10);
    }
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
  if (lightboxPrev) lightboxPrev.addEventListener('click', showPrevImage);
  if (lightboxNext) lightboxNext.addEventListener('click', showNextImage);

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
  if (lightboxImage) lightboxImage.addEventListener('dragstart', (e) => e.preventDefault());
}

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
// Scroll reveal con fade-in + translateX desde -50px
// Delay escalonado de 100ms entre elementos
const fadeElements = document.querySelectorAll('.fade-in');

if (fadeElements.length > 0) {
  // Fallback para navegadores sin IntersectionObserver
  if (!('IntersectionObserver' in window)) {
    fadeElements.forEach(element => {
      element.classList.add('visible');
    });
  } else {
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Aplicar delay escalonado basado en el índice del elemento
          const delay = parseInt(entry.target.dataset.index || 0) * 100;
          
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);
          
          // Dejar de observar una vez animado
          fadeObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    // Asignar índices y observar elementos
    fadeElements.forEach((element, index) => {
      // Buscar si el elemento está dentro de un contenedor con hermanos
      const parent = element.parentElement;
      const siblings = parent ? Array.from(parent.children).filter(el => el.classList.contains('fade-in')) : [];
      
      // Si hay hermanos, usar índice relativo al grupo
      if (siblings.length > 1) {
        const indexInGroup = siblings.indexOf(element);
        element.dataset.index = indexInGroup;
      } else {
        element.dataset.index = 0;
      }
      
      fadeObserver.observe(element);
    });
  }
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
// TESTIMONIOS SCROLL REVEAL
// ==========================================
function initTestimonios() {
  const testimonioCards = document.querySelectorAll('.testimonio-card');
  
  if (testimonioCards.length === 0) return;

  // Fallback para navegadores sin IntersectionObserver
  if (!('IntersectionObserver' in window)) {
    testimonioCards.forEach(card => {
      card.classList.add('animate');
    });
    return;
  }

  const testimoniosObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const card = entry.target;
        const delay = parseInt(card.dataset.delay || 0);
        
        setTimeout(() => {
          card.classList.add('animate');
        }, delay);
        
        // Dejar de observar una vez animado
        testimoniosObserver.unobserve(card);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
  });

  // Observar cada tarjeta
  testimonioCards.forEach(card => {
    testimoniosObserver.observe(card);
  });
}

// ==========================================
// PARALLAX EFFECT
// ==========================================
function initParallax() {
  const parallaxCircles = document.querySelectorAll('.parallax-circle');
  const testimoniosSection = document.querySelector('.testimonios-section');
  
  if (!parallaxCircles.length || !testimoniosSection) return;

  let ticking = false;
  let sectionTop = 0;
  let sectionHeight = 0;

  // Calcular posición de la sección
  function updateSectionBounds() {
    const rect = testimoniosSection.getBoundingClientRect();
    sectionTop = window.pageYOffset + rect.top;
    sectionHeight = rect.height;
  }

  // Efecto parallax
  function handleParallax() {
    const scrollY = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    // Verificar si la sección está en el viewport
    if (scrollY + windowHeight > sectionTop && scrollY < sectionTop + sectionHeight) {
      const relativeScroll = scrollY - sectionTop + windowHeight;
      const parallaxOffset = relativeScroll * 0.5; // Velocidad 0.5x
      
      parallaxCircles.forEach((circle, index) => {
        // Diferentes velocidades para cada círculo (más rápido y evidente)
        const speed = 0.5 + (index * 0.15); // 0.5, 0.65, 0.8
        const offset = relativeScroll * speed;
        circle.style.transform = `translateY(${offset}px)`;
      });
    }
    
    ticking = false;
  }

  // Request animation frame para optimizar performance
  function requestTick() {
    if (!ticking) {
      window.requestAnimationFrame(handleParallax);
      ticking = true;
    }
  }

  // Event listeners
  window.addEventListener('scroll', requestTick, { passive: true });
  window.addEventListener('resize', updateSectionBounds);
  
  // Inicializar
  updateSectionBounds();
}

// ==========================================
// BENEFITS SCROLL REVEAL
// ==========================================
function initBenefitsReveal() {
  const benefitCards = document.querySelectorAll('.benefit-reveal');
  
  if (benefitCards.length === 0) return;

  // Fallback para navegadores sin IntersectionObserver
  if (!('IntersectionObserver' in window)) {
    benefitCards.forEach(card => {
      card.classList.add('revealed');
    });
    return;
  }

  const benefitsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const card = entry.target;
      const delay = parseInt(card.dataset.revealDelay || 0);
      
      if (entry.isIntersecting) {
        setTimeout(() => {
          card.classList.add('revealed');
        }, delay);
      } else {
        // Remover clase cuando sale del viewport para repetir animación
        card.classList.remove('revealed');
      }
    });
  }, {
    threshold: 0.6,
    rootMargin: '0px'
  });

  // Observar cada tarjeta
  benefitCards.forEach(card => {
    benefitsObserver.observe(card);
  });
}

// ==========================================
// INITIALIZE ALL FUNCTIONS
// ==========================================
// Call back to top function
initBackToTop();

// Initialize testimonios scroll reveal
initTestimonios();

// Initialize parallax effect
initParallax();

// Initialize benefits scroll reveal
initBenefitsReveal();
initParallax();
