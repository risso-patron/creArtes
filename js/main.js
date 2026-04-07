// ===== ANTIGRAVITY EFFECT — FLUID CAPE / CAPA AL VIENTO (ULTIMATE FIDELITY) =====
;(function () {
  const canvas = document.getElementById('antigravityCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let w, h, particles = [];
  const PARTICLE_COUNT = 300;
  let time = 0;
  
  const COLORS = {
    top: '#00f2f2', 
    mid: '#7000ff',
    bottom: '#ff007a'
  };
  
  let focalPoint = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  let targetFocalPoint = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  let lastMouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  let mouseVel = { x: 0, y: 0 };

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    targetFocalPoint.x = w / 2;
    targetFocalPoint.y = h / 2;
  }

  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', (e) => {
    targetFocalPoint.x = e.clientX;
    targetFocalPoint.y = e.clientY;
    
    // Calculate mouse velocity for the "Wind/Cape" momentum
    mouseVel.x = (e.clientX - lastMouse.x) * 0.2;
    mouseVel.y = (e.clientY - lastMouse.y) * 0.2;
    lastMouse.x = e.clientX;
    lastMouse.y = e.clientY;
  });

  function Particle() {
    this.init();
  }

  Particle.prototype.init = function() {
    this.angle = Math.random() * Math.PI * 2;
    // Huge spread to match the reference majestically
    this.radius = Math.random() * 600 + 40; 
    
    this.x = focalPoint.x + Math.cos(this.angle) * this.radius;
    this.y = focalPoint.y + Math.sin(this.angle) * this.radius;
    
    this.speed = Math.random() * 0.4 + 0.1;
    this.vx = (this.x - focalPoint.x) * 0.005;
    this.vy = (this.y - focalPoint.y) * 0.005;
    
    this.vx += mouseVel.x * (Math.random() * 0.4 + 0.3);
    this.vy += mouseVel.y * (Math.random() * 0.4 + 0.3);

    this.size = Math.random() * 1.2 + 0.8; // Very small and sharp
    this.life = Math.random() * 150 + 100;
    this.currentLife = this.life;
    this.offset = Math.random() * 100;
  };

  Particle.prototype.update = function() {
    // Friction/Inertia
    this.vx *= 0.98;
    this.vy *= 0.98;

    // Wind Wave Effect (Cape undulation)
    const windX = Math.sin(time + this.y * 0.01) * 0.3;
    const windY = Math.cos(time + this.x * 0.01) * 0.3;
    
    this.x += this.vx + windX;
    this.y += this.vy + windY;
    
    // Fading
    this.currentLife--;
    this.alpha = (this.currentLife / this.life) * 0.7;

    if (this.currentLife <= 0) {
      this.init();
    }
  };

  Particle.prototype.draw = function() {
    let color;
    const relativeY = this.y / h;
    if (relativeY < 0.4) color = COLORS.top;
    else if (relativeY < 0.7) color = COLORS.mid;
    else color = COLORS.bottom;

    ctx.beginPath();
    ctx.globalAlpha = this.alpha;
    ctx.strokeStyle = color;
    ctx.lineWidth = this.size;
    
    // Final Fidelity Ticks: Very short, almost like stars
    const length = 4;
    const angle = Math.atan2(this.vy, this.vx);
    
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + Math.cos(angle) * length, this.y + Math.sin(angle) * length);
    ctx.stroke();
  };

  function init() {
    resize();
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = new Particle();
      p.currentLife = Math.random() * p.life;
      particles.push(p);
    }
  }

  function render() {
    ctx.clearRect(0, 0, w, h);
    time += 0.05;

    // Smooth focal point
    focalPoint.x += (targetFocalPoint.x - focalPoint.x) * 0.08;
    focalPoint.y += (targetFocalPoint.y - focalPoint.y) * 0.08;
    
    // Decay mouse velocity
    mouseVel.x *= 0.9;
    mouseVel.y *= 0.9;

    particles.forEach(p => {
      p.update();
      p.draw();
    });
    
    requestAnimationFrame(render);
  }

  init();
  render();
})();


// ===== ZODIAC CONSTELLATIONS — WHY US BACKGROUND =====
;(function () {
  const canvas = document.getElementById('whyUsCanvas')
  if (!canvas) return

  const ctx = canvas.getContext('2d')

  // ---- Física ----
  const ATTRACT_SPD = 0.052
  const RELEASE_SPD = 0.015
  const DRIFT_SPD   = 0.12
  const SCATTER_R   = 6      // radio de dispersión por estrella (px)
  const PTS_STAR    = 4      // partículas por estrella
  const FREE_COUNT  = 55     // partículas libres de fondo

  let W, H, particles = [], cdList = [], isHovered = false, time = 0

  // ---- 12 Constelaciones del zodiaco ----
  // rx, ry  = centro relativo (0-1) dentro del canvas
  // scale   = tamaño relativo a Math.min(W,H)
  // stars   = posiciones locales normalizadas [0-1, 0-1]
  // edges   = pares de índices de estrellas que se unen con línea
  const CONSTELLATIONS = [
    {
      name: 'Aries', rx: 0.10, ry: 0.14, scale: 0.10,
      stars: [[0.0,0.55],[0.32,0.22],[0.62,0.12],[0.90,0.30],[1.0,0.0]],
      edges: [[0,1],[1,2],[2,3],[3,4]]
    },
    {
      name: 'Taurus', rx: 0.32, ry: 0.11, scale: 0.12,
      stars: [[0.50,0.55],[0.68,0.35],[0.88,0.12],[0.28,0.38],[0.10,0.55],[0.30,0.72],[0.68,0.65],[0.10,0.10],[0.18,0.02],[0.28,0.10]],
      edges: [[0,1],[1,2],[0,3],[3,4],[0,5],[0,6],[7,8],[8,9],[7,9]]
    },
    {
      name: 'Gemini', rx: 0.57, ry: 0.10, scale: 0.11,
      stars: [[0.22,0.0],[0.78,0.0],[0.20,0.32],[0.76,0.30],[0.24,0.60],[0.72,0.58],[0.18,0.90],[0.68,0.88]],
      edges: [[0,2],[2,4],[4,6],[1,3],[3,5],[5,7],[2,3]]
    },
    {
      name: 'Cancer', rx: 0.82, ry: 0.14, scale: 0.09,
      stars: [[0.50,0.0],[0.50,0.42],[0.18,0.68],[0.82,0.68],[0.25,1.0],[0.75,1.0]],
      edges: [[0,1],[1,2],[1,3],[2,4],[3,5]]
    },
    {
      name: 'Leo', rx: 0.93, ry: 0.42, scale: 0.13,
      stars: [[0.18,0.38],[0.05,0.08],[0.28,0.18],[0.58,0.06],[0.78,0.22],[0.72,0.52],[0.50,0.78],[0.88,0.65],[0.96,0.88]],
      edges: [[0,1],[1,2],[2,3],[3,4],[4,5],[0,5],[5,6],[6,7],[7,8]]
    },
    {
      name: 'Virgo', rx: 0.74, ry: 0.48, scale: 0.13,
      stars: [[0.50,0.0],[0.50,0.28],[0.22,0.42],[0.78,0.40],[0.52,0.58],[0.28,0.78],[0.28,1.0],[0.72,0.75]],
      edges: [[0,1],[1,2],[1,3],[1,4],[4,5],[5,6],[4,7]]
    },
    {
      name: 'Libra', rx: 0.88, ry: 0.68, scale: 0.10,
      stars: [[0.50,0.15],[0.18,0.50],[0.82,0.50],[0.50,0.65],[0.28,0.92],[0.72,0.92]],
      edges: [[0,1],[0,2],[1,2],[1,3],[2,3],[3,4],[3,5]]
    },
    {
      name: 'Scorpio', rx: 0.60, ry: 0.76, scale: 0.14,
      stars: [[0.55,0.0],[0.40,0.08],[0.22,0.22],[0.10,0.42],[0.18,0.62],[0.35,0.72],[0.56,0.78],[0.76,0.72],[0.88,0.55],[0.90,0.34]],
      edges: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9]]
    },
    {
      name: 'Sagittarius', rx: 0.38, ry: 0.80, scale: 0.13,
      stars: [[0.50,0.02],[0.30,0.28],[0.52,0.35],[0.70,0.28],[0.15,0.60],[0.42,0.58],[0.64,0.60],[0.84,0.55],[0.12,0.85],[0.88,0.80]],
      edges: [[0,1],[0,2],[0,3],[1,4],[2,5],[3,6],[4,5],[5,6],[6,7],[4,8],[7,9]]
    },
    {
      name: 'Capricorn', rx: 0.14, ry: 0.72, scale: 0.11,
      stars: [[0.02,0.06],[0.42,0.08],[0.28,0.42],[0.64,0.38],[0.52,0.70],[0.84,0.64],[0.96,0.88]],
      edges: [[0,1],[0,2],[1,3],[2,3],[2,4],[3,5],[4,5],[5,6]]
    },
    {
      name: 'Aquarius', rx: 0.82, ry: 0.88, scale: 0.11,
      stars: [[0.22,0.02],[0.52,0.15],[0.76,0.12],[0.80,0.40],[0.32,0.50],[0.60,0.60],[0.36,0.75],[0.64,0.85]],
      edges: [[0,1],[1,2],[2,3],[1,4],[3,4],[4,5],[5,6],[5,7]]
    },
    {
      name: 'Pisces', rx: 0.30, ry: 0.90, scale: 0.12,
      stars: [[0.04,0.32],[0.18,0.14],[0.34,0.30],[0.18,0.48],[0.50,0.50],[0.65,0.50],[0.72,0.22],[0.88,0.10],[1.0,0.30],[0.88,0.48]],
      edges: [[0,1],[1,2],[2,3],[3,0],[2,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,5]]
    }
  ]

  function resize() {
    const s = canvas.closest('section')
    W = canvas.width  = s ? s.offsetWidth  : window.innerWidth
    H = canvas.height = s ? s.offsetHeight : window.innerHeight
  }

  // Convierte posiciones locales 0-1 a píxeles del canvas
  function buildData() {
    cdList = CONSTELLATIONS.map(c => {
      const dim    = Math.min(W, H) * c.scale
      const cx     = c.rx * W
      const cy     = c.ry * H
      const stars  = c.stars.map(([sx, sy]) => ({
        x: cx + (sx - 0.5) * dim,
        y: cy + (sy - 0.5) * dim
      }))
      const edges = c.edges.map(([a, b]) => ({ a: stars[a], b: stars[b] }))
      return { name: c.name, stars, edges }
    })
  }

  function Particle(tx, ty) {
    this.x = Math.random() * (W || 800)
    this.y = Math.random() * (H || 600)
    this.homeX = this.x
    this.homeY = this.y
    const a = Math.random() * Math.PI * 2
    const spd = DRIFT_SPD * (0.5 + Math.random() * 0.5)
    this.hdx = Math.cos(a) * spd
    this.hdy = Math.sin(a) * spd
    this.tx = tx
    this.ty = ty
    this.hasTarget = (tx !== undefined)
    this.phase = Math.random() * Math.PI * 2
    this.size  = Math.random() * 1.8 + 0.9
    this.alpha = Math.random() * 0.28 + 0.18
  }

  Particle.prototype.update = function () {
    if (isHovered && this.hasTarget) {
      this.x += (this.tx - this.x) * ATTRACT_SPD
      this.y += (this.ty - this.y) * ATTRACT_SPD
      this.homeX = this.x
      this.homeY = this.y
    } else {
      this.homeX += this.hdx
      this.homeY += this.hdy
      if (this.homeX < -20) this.homeX = W + 20
      if (this.homeX > W + 20) this.homeX = -20
      if (this.homeY < -20) this.homeY = H + 20
      if (this.homeY > H + 20) this.homeY = -20
      if (Math.random() < 0.003) {
        const a = Math.random() * Math.PI * 2
        this.hdx = Math.cos(a) * DRIFT_SPD * (0.5 + Math.random() * 0.5)
        this.hdy = Math.sin(a) * DRIFT_SPD * (0.5 + Math.random() * 0.5)
      }
      this.x += (this.homeX - this.x) * RELEASE_SPD
      this.y += (this.homeY - this.y) * RELEASE_SPD
    }
  }

  Particle.prototype.draw = function () {
    const pulse = (isHovered && this.hasTarget)
      ? this.size * (1 + Math.sin(time * 2.5 + this.phase) * 0.14)
      : this.size
    ctx.beginPath()
    ctx.arc(this.x, this.y, pulse, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(7,153,140,' + this.alpha + ')'
    ctx.fill()
  }

  // Dibuja líneas de constelación solo en hover (fade-in implícito por ATTRACT_SPD)
  function drawLines() {
    if (!isHovered) return
    ctx.lineWidth   = 0.7
    ctx.strokeStyle = 'rgba(7,153,140,0.18)'
    cdList.forEach(cd => {
      cd.edges.forEach(e => {
        ctx.beginPath()
        ctx.moveTo(e.a.x, e.a.y)
        ctx.lineTo(e.b.x, e.b.y)
        ctx.stroke()
      })
    })
  }

  function init() {
    resize()
    buildData()
    particles = []
    cdList.forEach(cd => {
      cd.stars.forEach(star => {
        for (let i = 0; i < PTS_STAR; i++) {
          const a = Math.random() * Math.PI * 2
          const r = Math.random() * SCATTER_R
          particles.push(new Particle(
            star.x + Math.cos(a) * r,
            star.y + Math.sin(a) * r
          ))
        }
      })
    })
    for (let i = 0; i < FREE_COUNT; i++) particles.push(new Particle())
    // Empezar todas dispersas en modo reposo
    particles.forEach(p => {
      p.x = Math.random() * W; p.y = Math.random() * H
      p.homeX = p.x; p.homeY = p.y
    })
  }

  function drawFrame() {
    time += 0.016
    ctx.clearRect(0, 0, W, H)
    drawLines()
    for (let i = 0; i < particles.length; i++) {
      particles[i].update()
      particles[i].draw()
    }
    requestAnimationFrame(drawFrame)
  }

  window.addEventListener('resize', () => { init() })

  const section = canvas.closest('section')
  if (section) {
    section.addEventListener('mouseenter', () => { isHovered = true  })
    section.addEventListener('mouseleave', () => { isHovered = false })
    section.addEventListener('touchstart', () => { isHovered = true  }, { passive: true })
    section.addEventListener('touchend',   () => { isHovered = false })
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
  // Set playback rate — 0.85 = 15% más lento
  heroVideo.playbackRate = 0.55
  
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

// ===== SERVICIOS ACCORDION =====
window.addEventListener('load', function () {
  var acordItems = document.querySelectorAll('.acord-item')
  acordItems.forEach(function (item) {
    var header = item.querySelector('.acord-header')
    if (!header) return
    header.addEventListener('click', function () {
      var isOpen = item.classList.contains('is-open')
      // Close all
      acordItems.forEach(function (i) {
        i.classList.remove('is-open')
        var h = i.querySelector('.acord-header')
        if (h) h.setAttribute('aria-expanded', 'false')
      })
      // Open clicked (unless it was already open)
      if (!isOpen) {
        item.classList.add('is-open')
        header.setAttribute('aria-expanded', 'true')
        if (window.innerWidth < 768) {
          setTimeout(function () {
            item.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
          }, 50)
        }
      }
    })
    header.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); header.click() }
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

    // Anti-spam honeypot
    const honeypot = document.getElementById("website");
    if (honeypot && honeypot.value !== "") {
      return false;
    }

    // Get form data (Only fields currently in the HTML)
    const formData = {
      nombre: document.getElementById("name").value,
      telefono: document.getElementById("phone").value,
      mensaje: document.getElementById("message").value,
    }

    // Basic validation
    if (!formData.nombre || !formData.telefono || !formData.mensaje) {
      alert("Por favor completa todos los campos obligatorios.")
      return
    }

    // Show success message
    contactForm.classList.add("hidden")
    formSuccess.classList.remove("hidden")

    // Create WhatsApp message (Higher conversion focus)
    const whatsappMessage = `¡Hola Studio CreArtes! 👋 

Me gustaría solicitar una cotización para mi proyecto.

*Mis datos:*
👤 Nombre: ${formData.nombre}
📱 WhatsApp: ${formData.telefono}

*¿Qué necesito?*
${formData.mensaje}

¡Espero su respuesta pronto!`

    const whatsappUrl = `https://wa.me/50769347097?text=${encodeURIComponent(whatsappMessage)}`

    // Auto-redirect to WhatsApp after 1.5 seconds
    setTimeout(() => {
      window.open(whatsappUrl, '_blank')
    }, 1500)
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
